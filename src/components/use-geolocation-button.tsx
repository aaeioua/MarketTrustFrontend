import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

type Props = {
  onLocation: (longitude: number, latitude: number) => void;
  useStored: boolean;
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  children?: React.ReactNode;
};

export const UseGeolocationButton: React.FC<Props> = ({ onLocation, className, variant, children, useStored }) => {
  const { token, user } = useAuth();
  const [locating, setLocating] = useState(false);

  const handleClick = () => {
    const storedCoords = user?.location?.coordinates;
    if (useStored && token && Array.isArray(storedCoords) && storedCoords.length === 2) {
      const [lng, lat] = storedCoords;
      if (typeof lng === "number" && typeof lat === "number") {
        onLocation(lng, lat);
        toast.success("Using account location");
        return;
      }
    }

    if (!navigator.geolocation) {
      toast.error("Geolocation not supported by this browser");
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { longitude, latitude } = pos.coords;
        onLocation(longitude, latitude);
        toast.success("Location set");
        setLocating(false);
      },
      (err) => {
        toast.error(`Failed to get location: ${err.message}`);
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <Button type="button" variant={variant} className={className} onClick={handleClick} disabled={locating}>
      {locating ? "Locating..." : children ?? "Use geolocation"}
    </Button>
  );
};

export default UseGeolocationButton;
