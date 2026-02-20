import React from "react";
import AccountCard from "@/components/account-card";
import UserPostsCard from "@/components/user-posts-card";
import { useAuth } from "@/contexts/auth-context";
import UserInfoCard from "@/components/user-info-card";

const AccountPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <div className="p-6">No user found</div>;

  return (
    <div className="flex flex-col items-center pt-6 gap-6">
      <UserInfoCard user={user} />
      <AccountCard />
      {user ? <UserPostsCard user={user} /> : null}
    </div>
  );
};

export default AccountPage;
