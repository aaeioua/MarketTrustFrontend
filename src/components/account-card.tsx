import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type { UpdateUserDto } from "@/Api";
import { Card, CardContent } from "@/components/ui/card";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import UseGeolocationButton from "@/components/use-geolocation-button";
import api from "@/lib/apiClient";
import { ChevronDownIcon } from "lucide-react";

const AccountCard: React.FC = () => {
  const navigate = useNavigate();
  const { token, user, logout } = useAuth();
  const [form, setForm] = useState<UpdateUserDto>({});
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (user) {
      const coordinates = user.location?.coordinates;
      let longitude: number | undefined = undefined;
      let latitude: number | undefined = undefined;
      if (coordinates && coordinates.length === 2) {
        longitude = coordinates[0] as number;
        latitude = coordinates[1] as number;
      }

      setForm({
        name: user.name,
        email: user.email,
        phone: user.phone,
        isPublicEmail: user.isPublicEmail,
        isPublicPhone: user.isPublicPhone,
        isPublicLocation: user.isPublicLocation,
        longitude: longitude,
        latitude: latitude,
      });
    }
  }, [token, user, navigate]);

  const handleChange = (key: keyof UpdateUserDto) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const value = raw === "" ? null : raw;
    setForm((s) => ({ ...s, [key]: value }));
  };

  const handleLocationChange = (coordinate: "longitude" | "latitude") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const parsed = raw === "" ? undefined : Number(raw);
    const newValue = parsed === undefined || Number.isNaN(parsed) ? undefined : parsed;
    setForm((s) => ({ ...s, [coordinate]: newValue }));
  };

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const isLongitudePresent = typeof form.longitude === "number";
      const isLatitudePresent = typeof form.latitude === "number";
      if (isLongitudePresent !== isLatitudePresent) {
        toast.error("Please provide both longitude and latitude, or leave both empty.");
        setSubmitting(false);
        return;
      }

      const res = await api.api.userUpdate(form);
      if (res.data) {
        toast.success("Account updated");
      } else {
        toast.error("Update failed");
      }
    } catch {
      toast.error("Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.api.userDelete();
      toast.success("Account deleted");
      logout();
      navigate("/login");
    } catch {
      toast.error("Account deletion failed");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardContent>
        <Collapsible className="data-[state=open] rounded-md">
          <CollapsibleTrigger asChild>
              <Button variant="ghost" className="group w-full">
                Account Settings
                <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
              </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup className="space-y-4">
                <div>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input id="name" name="name" value={form.name ?? ""} onChange={handleChange("name")} />
                </div>

                <div>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input id="email" name="email" type="email" value={form.email ?? ""} onChange={handleChange("email")} />
                </div>

                <div>
                  <FieldLabel htmlFor="phone">Phone</FieldLabel>
                  <Input id="phone" name="phone" value={form.phone ?? ""} onChange={handleChange("phone")} />
                </div>

                <div>
                  <FieldLabel>Location</FieldLabel>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Longitude" value={form.longitude ?? ""} onChange={handleLocationChange("longitude")} />
                    <Input placeholder="Latitude" value={form.latitude ?? ""} onChange={handleLocationChange("latitude")} />
                  </div>
                  <div className="mt-2">
                    <UseGeolocationButton
                      variant="outline"
                      onLocation={(lng, lat) => setForm((s) => ({ ...s, longitude: lng, latitude: lat }))}
                      useStored={false}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <FieldLabel htmlFor="isPublicEmail">Public email</FieldLabel>
                  </div>
                  <div className="col-span-2">
                    <Switch
                      id="isPublicEmail"
                      checked={!!form.isPublicEmail}
                      onCheckedChange={(v) => setForm((s) => ({ ...s, isPublicEmail: v }))}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <FieldLabel htmlFor="isPublicPhone">Public phone</FieldLabel>
                  </div>
                  <div className="col-span-2">
                    <Switch
                      id="isPublicPhone"
                      checked={!!form.isPublicPhone}
                      onCheckedChange={(v) => setForm((s) => ({ ...s, isPublicPhone: v }))}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <FieldLabel htmlFor="isPublicLocation">Public location</FieldLabel>
                  </div>
                  <div className="col-span-2">
                    <Switch
                      id="isPublicLocation"
                      checked={!!form.isPublicLocation}
                      onCheckedChange={(v) => setForm((s) => ({ ...s, isPublicLocation: v }))}
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end items-center">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button type="button" variant="destructive">Delete account</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete account</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action is permanent and cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" onClick={handleDelete}>{deleting ? "Deleting..." : "Delete"}</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button type="button" variant="outline" onClick={handleLogout}>Logout</Button>
                  <Button type="submit" disabled={submitting}>{submitting ? "Saving..." : "Save"}</Button>
                </div>
              </FieldGroup>
            </form>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default AccountCard;
