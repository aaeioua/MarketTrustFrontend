import React, { useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { PropertyValueDto, UpdatePropertyValueDto, AddPropertyValueDto, PostDto } from "@/Api";
import api from "@/lib/apiClient";
import { useAuth } from "@/contexts/AuthContext";

type Props = {
  post: PostDto;
  onUpdatedPost: (post: PostDto) => void;
};

const PostProperties: React.FC<Props> = ({ post, onUpdatedPost }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<PropertyValueDto[]>(post.propertyValues ?? []);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingValues, setEditingValues] = useState<UpdatePropertyValueDto>({ name: "", value: "" });
  const [adding, setAdding] = useState(false);
  const [newItem, setNewItem] = useState<AddPropertyValueDto>({ name: "", value: "" });
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);

  const isAuthor = user && user.id === post.userId;

  const refreshFromResponse = (newPost: PostDto) => {
    if (newPost.propertyValues) {
      setItems(newPost.propertyValues);
      onUpdatedPost(newPost);
    }
  };

  const startEdit = (propertyValue: PropertyValueDto) => {
    setEditingId(propertyValue.id ?? null);
    setEditingValues({ name: propertyValue.name, value: propertyValue.value });
  };

  const saveEdit = async (propertyValueId: number) => {
    setLoadingId(propertyValueId);
    try {
      const res = await api.api.postUpdate2(Number(post.id), propertyValueId, editingValues);
      refreshFromResponse(res.data);
      setEditingId(null);
      toast.success("Property updated");
    } catch {
      toast.error("Update failed");
    } finally {
      setLoadingId(null);
    }
  };

  const deleteItem = async (propertyValueId: number) => {
    setLoadingId(propertyValueId);
    try {
      const res = await api.api.postDelete2(Number(post.id), propertyValueId);
      refreshFromResponse(res.data);
      toast.success("Property deleted");
    } catch {
      toast.error("Delete failed");
    } finally {
      setLoadingId(null);
    }
  };

  const createItem = async () => {
    setCreating(true);
    try {
      const res = await api.api.postCreate2(Number(post.id), newItem);
      refreshFromResponse(res.data);
      setNewItem({ name: "", value: "" });
      setAdding(false);
      toast.success("Property added");
    } catch {
      toast.error("Add failed");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            {isAuthor ? (
              <>
                <TableHead className="w-[45%]">Property</TableHead>
                <TableHead className="w-[45%]">Value</TableHead>
                <TableHead className="w-auto" />
              </>
            ) : (
              <>
                <TableHead className="w-1/2">Property</TableHead>
                <TableHead className="w-1/2">Value</TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((post) => (
            <TableRow key={post.id}>
              <TableCell className={isAuthor ? "overflow-hidden text-ellipsis max-w-[45%]" : "w-1/2 overflow-hidden text-ellipsis"}>
                {post.id === editingId ? (
                  <Input value={editingValues.name ?? ""} onChange={(e) => setEditingValues((s) => ({ ...s, name: e.target.value }))} />
                ) : (
                  post.name
                )}
              </TableCell>
              <TableCell className={isAuthor ? "overflow-hidden text-ellipsis max-w-[45%]" : "w-1/2 overflow-hidden text-ellipsis"}>
                {post.id === editingId ? (
                  <Input value={editingValues.value ?? ""} onChange={(e) => setEditingValues((s) => ({ ...s, value: e.target.value }))} />
                ) : (
                  post.value
                )}
              </TableCell>
              {isAuthor && (
                <TableCell className="text-right w-auto">
                  {post.id === editingId ? (
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" onClick={() => saveEdit(Number(post.id))} disabled={post.id === loadingId}>{post.id === loadingId ? "Saving..." : "Save"}</Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                    </div>
                  ) : (
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" onClick={() => startEdit(post)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteItem(Number(post.id))} disabled={post.id === loadingId}>{post.id === loadingId ? "Deleting..." : "Delete"}</Button>
                    </div>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
          {adding && (
            <TableRow>
              <TableCell className="overflow-hidden text-ellipsis max-w-[45%]">
                <Input className="w-full" placeholder="Name" value={newItem.name} onChange={(e) => setNewItem((s) => ({ ...s, name: e.target.value }))} />
              </TableCell>
              <TableCell className="overflow-hidden text-ellipsis max-w-[45%]">
                <Input className="w-full" placeholder="Value" value={newItem.value} onChange={(e) => setNewItem((s) => ({ ...s, value: e.target.value }))} />
              </TableCell>
              <TableCell className="text-right w-auto">
                <div className="flex gap-2 justify-end">
                  <Button onClick={createItem} disabled={creating}>{creating ? "Adding..." : "Add"}</Button>
                  <Button variant="outline" onClick={() => { setAdding(false); setNewItem({ name: "", value: "" }); }}>Cancel</Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableCaption>{items.length === 0 ? "No properties for this post." : ""}</TableCaption>
      </Table>

      {isAuthor && !adding && (
        <div className="flex justify-center">
          <Button onClick={() => setAdding(true)}>Add property</Button>
        </div>
      )}
    </div>
  );
};

export default PostProperties;
