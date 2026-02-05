import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import type { PostDto, UpdatePostDto } from "@/Api";
import type { CategoryDto } from "@/Api";
import api from "@/lib/apiClient";
import { useAuth } from "@/contexts/AuthContext";

type Props = {
  post: PostDto;
  onUpdatedPost: (update: UpdatePostDto) => void;
};

const PostEditCard: React.FC<Props> =  ({ post, onUpdatedPost }) => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<UpdatePostDto>({
    title: post.title,
    content: post.content,
    price: post.price,
    categoryId: post.categoryId
  });
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryDto | null>(null);
  const [categoryName, setCategoryName] = useState<string>("");

  useEffect(() => {
    setForm((s) => ({ ...s, categoryId: selectedCategory?.id ?? s.categoryId }));
  }, [selectedCategory]);

  const fetchCategories = async (name: string) => {
    try {
      const res = await api.api.categoryList({ Name: name });
      const categories = res.data ?? [];
      setCategories(categories);
    } catch {
      toast.error("Failed to load categories");
      setCategories([]);
    }
  };

  const isAuthor = user && user.id === post.userId;
  if (!token || !isAuthor) return null;

  const handleChange = (key: keyof UpdatePostDto) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const raw = e.target.value;
    const parsed = raw === "" ? null : raw;
    setForm((s) => ({ ...s, [key]: parsed }));
  };

  const handleNumberChange = (key: "price") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const number = raw === "" ? null : Number(raw);
    const parsed = number === null || Number.isNaN(number) ? null : number;
    setForm((s) => ({ ...s, [key]: parsed }));
  };

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.api.postUpdate(Number(post.id), form);
      onUpdatedPost(form);
      setEditing(false);
      toast.success("Post updated");
    } catch {
      toast.error("Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.api.postDelete(Number(post.id));
      toast.success("Post deleted");
      navigate("/posts");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div>
    {!editing ? (
      <div className="flex gap-2 justify-end items-center">
        <Button onClick={() => setEditing(true)}>Edit post</Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete post</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete post</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive" onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    ) : (
      <Card className="w-full">
        <CardContent>
          {!editing ? (
            <div className="flex gap-2 justify-end items-center">
              <Button onClick={() => setEditing(true)}>Edit post</Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete post</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete post</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={handleDelete}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <FieldGroup className="space-y-4">
                <div>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input id="title" value={form.title ?? ""} onChange={handleChange("title")} />
                </div>

                <div>
                  <FieldLabel htmlFor="content">Content</FieldLabel>
                  <Textarea id="content" value={form.content ?? ""} onChange={handleChange("content")} />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <FieldLabel htmlFor="price">Price</FieldLabel>
                    <Input id="price" value={form.price ?? ""} onChange={handleNumberChange("price")} />
                  </div>

                  <div>
                    <FieldLabel>Category</FieldLabel>
                    <div className="w-full">
                      <Combobox
                        items={categories}
                        itemToStringValue={(c) => c.name ?? ""}
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <ComboboxInput
                          placeholder="Category"
                          value={selectedCategory?.name ?? categoryName}
                          onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                            const name = e.target.value;
                            setCategoryName(name);
                            setSelectedCategory(null);
                            await fetchCategories(name);
                          }}
                          onFocus={() => {
                            if (categories.length === 0) fetchCategories("");
                          }}
                        />
                        <ComboboxContent>
                          <ComboboxEmpty>No categories</ComboboxEmpty>
                          <ComboboxList>
                            {(category: CategoryDto) => (
                              <ComboboxItem key={category.id} value={category}>
                                {category.name}
                              </ComboboxItem>
                            )}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditing(false);
                      setForm({ title: post.title, content: post.content, price: post.price, categoryId: post.categoryId });
                    }}>
                      Cancel
                    </Button>
                  <Button type="submit" disabled={submitting}>{submitting ? "Saving..." : "Save"}</Button>
                </div>
              </FieldGroup>
            </form>
          )}
        </CardContent>
      </Card>
    )}
    </div>
  );
};

export default PostEditCard;
