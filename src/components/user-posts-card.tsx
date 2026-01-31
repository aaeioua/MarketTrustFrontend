import React, { useCallback, useEffect, useState } from "react";
import type { PostDto, UserDto } from "@/Api";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import PostsList from "@/components/posts-list";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/lib/apiClient";

type Props = {
  user: UserDto;
};

const UserPostsCard: React.FC<Props> = ({ user }) => {
  const [posts, setPosts] = useState<PostDto[]>([]);

  const fetchUserPosts = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await api.api.userDetail(user.id);
      const data = res.data;
      setPosts(data.posts ?? []);
    } catch {
      toast.error("Failed to load posts for user");
    }
  }, [user?.id]);

  useEffect(() => {
    fetchUserPosts();
  }, [fetchUserPosts]);

  return (
    <Card className="w-full max-w-2xl">
      <CardContent>
        <Collapsible className="data-[state=open] rounded-md">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="group w-full">
              {user.name ? `${user.name}'s posts` : "Posts"}
              <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-3">
              <PostsList posts={posts} users={user?.id ? { [user.id]: user } : {}} />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default UserPostsCard;
