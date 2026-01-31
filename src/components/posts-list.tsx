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

type Props = {
  posts: PostDto[];
  users: Record<string, UserDto>;
};

const PostsList: React.FC<Props> = ({ posts, users }) => {
  return (
    <ItemGroup>
      {posts.map((post) => (
        <Item key={post.id} className="hover:bg-muted/50">
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
              <div>{post.globalTrust != null ? `Global trust: ${post.globalTrust}` : null}</div>
              <div>{post.price != null ? `$${post.price}` : null}</div>
              <div>{post.personalTrust != null ? `Personal trust: ${post.personalTrust}` : null}</div>
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
