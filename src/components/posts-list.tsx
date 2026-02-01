import React from "react";
import { Link } from "react-router-dom";
import type { PostDto, UserDto } from "@/Api";
import {
  Item,
  ItemGroup,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { formatPercent } from "@/lib/utils";

type Props = {
  posts: PostDto[];
  users: Record<string, UserDto>;
};

const PostsList: React.FC<Props> = ({ posts, users }) => {
  return (
    <ItemGroup className="space-y-2">
      {posts.map((post) => (
        <Item key={post.id} variant="outline" className="hover:bg-muted/50">
          <ItemContent>
            <ItemTitle>
              <Link to={`/posts/${post.id}`} className="font-medium text-primary hover:underline">
                {post.title}
              </Link>
            </ItemTitle>
            <ItemDescription>{post.content}</ItemDescription>
            <div className="mt-2 text-sm text-muted-foreground grid grid-cols-2 gap-4">
              <div>
                By {post.userId ? (
                  <Link to={`/users/${post.userId}`} className="text-sm underline">
                    {users[post.userId]?.name ?? post.userId}
                  </Link>
                ) : (
                  "?"
                )}
              </div>
              <div>{typeof post.globalTrust === "number" ? `Global trust: ${formatPercent(post.globalTrust)}` : null}</div>
              <div>{typeof post.price === "number" ? `$${post.price}` : null}</div>
              <div>{typeof post.personalTrust === "number" ? `Personal trust: ${formatPercent(post.personalTrust)}` : null}</div>
            </div>
          </ItemContent>
          <ItemActions>
            <Link to={`/posts/${post.id}`}>
              <Button variant="ghost">View</Button>
            </Link>
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  );
};

export default PostsList;
