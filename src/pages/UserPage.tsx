import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/lib/apiClient";
import type { UserDto } from "@/Api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import UserPostsCard from "@/components/user-posts-card";
import { toast } from "sonner";

const UserPage: React.FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(false);

  let longitude: number | undefined = undefined;
  let latitude: number | undefined = undefined;
  const coords = user?.location?.coordinates;
  if (Array.isArray(coords) && coords.length === 2) {
    longitude = coords[0] as number;
    latitude = coords[1] as number;
  }

  useEffect(() => {
    if (!id) return;
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await api.api.userDetail(id);
        setUser(res.data);
      } catch {
        toast.error("Failed to load user");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (!user) return <div className="p-6">{loading ? "Loading..." : "User not found"}</div>;

  return (
    <div className="flex flex-col items-center pt-6 gap-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{user.name ?? "?"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <strong>Email:</strong> {user.isPublicEmail ? user.email ?? "-" : "Private"}
            </div>
            <div>
              <strong>Phone:</strong> {user.isPublicPhone ? user.phone ?? "-" : "Private"}
            </div>
            <div>
              <strong>Longitude, Latitude:</strong> {user.isPublicLocation
                ? (typeof longitude === "number" && typeof latitude === "number"
                  ? `${longitude}, ${latitude}`
                  : "-")
                : "Private"}
            </div>
          </div>
        </CardContent>
      </Card>
      {user ? <UserPostsCard user={user} /> : null}
    </div>
  );
};

export default UserPage;
