import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "@/lib/apiClient";
import type { PostDto, UserDto, CategoryDto, PropertyValueDto } from "@/Api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const PostPage: React.FC = () => {
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
        const post = res.data as PostDto;
        setPost(post);
        if (post.userId) {
          const user = await api.api.userDetail(post.userId);
          setPostUser(user.data as UserDto);
        }
        if (post.categoryId != null) {
          const category = await api.api.categoryDetail(post.categoryId);
          setCategory(category.data as CategoryDto);
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

  const properties = (post.propertyValues ?? []) as PropertyValueDto[];

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
              <strong>Global trust:</strong> {post.globalTrust ?? "-"}
            </div>
            <div>
              <strong>Personal trust:</strong> {post.personalTrust ?? "-"}
            </div>
            <div>
              <strong>Price:</strong> {post.price != null ? `$${post.price}` : "-"}
            </div>
          </div>

          <h3 className="text-lg mb-2">Properties</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>{property.name}</TableCell>
                  <TableCell>{property.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableCaption>{properties.length === 0 ? "No properties for this post." : ""}</TableCaption>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostPage;
