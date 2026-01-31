import React from "react";
import AccountCard from "@/components/account-card";
import UserPostsCard from "@/components/user-posts-card";
import { useAuth } from "@/contexts/AuthContext";

const AccountPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center pt-6 gap-6">
      <AccountCard />
      {user ? <UserPostsCard user={user} /> : null}
    </div>
  );
};

export default AccountPage;
