import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/apiClient";
import { useAuth } from "@/contexts/AuthContext";
import type { UserDto } from "@/Api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Combobox, ComboboxInput, ComboboxContent, ComboboxEmpty, ComboboxList, ComboboxItem } from "@/components/ui/combobox";
import { toast } from "sonner";

const CreateRatingPage: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserDto[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);
  const [userName, setUserName] = useState("");
  const [trustValue, setTrustValue] = useState("");
  const [comment, setComment] = useState("");

  const fetchUsers = async (name: string) => {
    try {
      const res = await api.api.userList({ Name: name });
      setUsers(res.data ?? []);
    } catch {
      setUsers([]);
      toast.error("Failed to load users");
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser?.id) {
      toast.error("Please choose a user to rate");
      return;
    }
    const value = Number(trustValue);
    if (Number.isNaN(value)) {
      toast.error("Invalid trust value");
      return;
    }

    try {
      await api.api.trustRatingCreate({ trusteeId: selectedUser.id, trustValue: value, comment: comment });
      toast.success("Rating created");
      navigate("/ratings");
    } catch {
      toast.error("Failed to create rating");
    }
  };

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  if (!token) return null;

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl mb-4">Create Rating</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">User</label>
          <div className="w-80">
            <Combobox
              items={users}
              itemToStringValue={(u) => u.name ?? ""}
              value={selectedUser}
              onValueChange={setSelectedUser}
            >
              <ComboboxInput
                placeholder="Username"
                value={selectedUser?.name ?? userName}
                onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                  const v = e.target.value;
                  setUserName(v);
                  setSelectedUser(null);
                  await fetchUsers(v);
                }}
                onFocus={() => { if (users.length === 0) fetchUsers(""); }}
              />
              <ComboboxContent>
                <ComboboxEmpty>No users</ComboboxEmpty>
                <ComboboxList>
                  {(u: UserDto) => (
                    <ComboboxItem key={u.id} value={u}>
                      {u.name}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </div>

        <div>
          <label className="block mb-1">Trust value</label>
          <Input type="number" value={trustValue} onChange={(e) => setTrustValue(e.target.value)} />
        </div>

        <div>
          <label className="block mb-1">Comment</label>
          <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>

        <Button type="submit">Create Rating</Button>
      </form>
    </div>
  );
};

export default CreateRatingPage;
