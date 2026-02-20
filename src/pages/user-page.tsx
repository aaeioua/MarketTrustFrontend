import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/lib/apiClient";
import type { UserDto } from "@/Api";
import UserInfoCard from "@/components/user-info-card";
import UserPostsCard from "@/components/user-posts-card";
import { toast } from "sonner";

const UserPage: React.FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(false);

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
      <UserInfoCard user={user} />
      <UserPostsCard user={user} />
    </div>
  );
};

export default UserPage;
