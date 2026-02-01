import React, { useEffect, useState } from "react";
import type { UserDto } from "@/Api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { BadgeCheck } from "lucide-react";
import api from "@/lib/apiClient";
import { formatPercent } from "@/lib/utils";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

type Props = {
  user: UserDto;
};

const UserInfoCard: React.FC<Props> = ({ user }) => {
  const [globalTrust, setGlobalTrust] = useState<number | null>(null);

  let longitude: number | undefined = undefined;
  let latitude: number | undefined = undefined;
  const coords = user?.location?.coordinates;
  if (Array.isArray(coords) && coords.length === 2) {
    longitude = coords[0] as number;
    latitude = coords[1] as number;
  }

  useEffect(() => {
    if (!user.id) return;
    const fetchGlobalTrust = async () => {
      try {
        const res = await api.api.reputationGlobalDetail(user.id!);
        setGlobalTrust(res.data);
      } catch {
        setGlobalTrust(null);
        toast.error("Failed to load global trust value");
      }
    };
    fetchGlobalTrust();
  }, [user.id]);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>
          {user.name ?? "?"}
          {user.isPretrusted && (
            <Badge className="ml-2 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                <BadgeCheck data-icon="inline-start" />
                Pretrusted
            </Badge>
          )}
        </CardTitle>
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
          <div className="flex items-center gap-1">
            <strong>Global trust:</strong> {globalTrust !== null ? formatPercent(globalTrust) : <Spinner />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;
