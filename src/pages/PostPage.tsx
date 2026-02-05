import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "@/lib/apiClient";
import type { PostDto, UserDto, CategoryDto } from "@/Api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatPercent } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import PostEditCard from "@/components/post-edit-card";
import PostProperties from "@/components/post-properties";
import { useAuth } from "@/contexts/AuthContext";

const PostPage: React.FC = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [post, setPost] = useState<PostDto | null>(null);
  const [postUser, setPostUser] = useState<UserDto | null>(null);
  const [category, setCategory] = useState<CategoryDto | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await api.api.postDetail(Number(id));
        const post = res.data;
        setPost(post);
        if (post.userId) {
          const user = await api.api.userDetail(post.userId);
          setPostUser(user.data);
        }
        if (post.categoryId != null) {
          const category = await api.api.categoryDetail(post.categoryId);
          setCategory(category.data);
        }
      } catch {
        toast.error("Failed to load post");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (!post) return <div className="p-6">{loading ? "Loading..." : "Post not found"}</div>;

  return (
    <div className="p-6">
      <div className="mb-4">
        <Button variant="ghost" asChild>
          <Link to="/posts"><ArrowLeft /> Back to posts</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 whitespace-pre-wrap">{post.content}</div>
          <div className="mb-4 space-y-1">
            <div>
              <strong>Author:</strong> {post.userId ? (
                  <Link to={`/users/${post.userId}`} className="text-sm underline">
                    {postUser?.name ?? post.userId}
                  </Link>
                ) : (
                  "?"
                )}
            </div>
            <div>
              <strong>Category:</strong> {category?.name ?? post.categoryId}
            </div>
            <div>
              <strong>Created:</strong> {post.createdAt ? new Date(post.createdAt).toLocaleString() : "-"}
            </div>
            <div>
              <strong>Last updated:</strong> {post.lastUpdatedAt ? new Date(post.lastUpdatedAt).toLocaleString() : "-"}
            </div>
            <div>
              <strong>Global trust:</strong> {typeof post.globalTrust === "number" ? formatPercent(post.globalTrust) : "-"}
            </div>
            <div>
              <strong>Personal trust:</strong> {typeof post.personalTrust === "number" ? formatPercent(post.personalTrust) : "-"}
            </div>
            <div>
              <strong>Price:</strong> {typeof post.price === "number" ? `$${post.price}` : "-"}
            </div>
          </div>

          <PostProperties post={post} onUpdatedPost={setPost} />

          {user && user.id === post.userId && (
            <div className="mt-4">
              <PostEditCard
                post={post}
                onUpdatedPost={(update) => {
                  setPost({ ...post,
                    title: update.title,
                    content: update.content,
                    price: update.price,
                    categoryId: update.categoryId ?? post.categoryId
                  });
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PostPage;
