import React, { useCallback, useEffect, useState } from "react";
import api from "@/lib/apiClient";
import { useAuth } from "@/contexts/auth-context";
import type { TrustRatingDto, UpdateTrustRatingDto, UserDto } from "@/Api";
import Paginator from "@/components/paginator";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import RatingsList from "@/components/ratings-list";
import RatingsSearch from "@/components/ratings-search";

const PAGE_SIZE = 25;

type RatingQuery = {
  TrusteeId?: string;
  Page?: number;
  PageSize?: number;
};

const RatingsPage: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [ratings, setRatings] = useState<TrustRatingDto[]>([]);
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState<UserDto[]>([]);
  const [userMap, setUserMap] = useState<Record<string, UserDto>>({});
  const [editing, setEditing] = useState<Record<number, UpdateTrustRatingDto>>({});

  const fetchRatings = useCallback(async () => {
    try {
      const query: RatingQuery = {
        Page: page, PageSize: PAGE_SIZE
      };
      if (selectedUser?.id) query.TrusteeId = selectedUser.id;

      const res = await api.api.trustRatingList(query);
      const data = res.data ?? [];
      setRatings(data);

      const trusteeIds = data
        .map((r) => r.trusteeId)
        .filter((id): id is string => typeof id === "string");
      const promises = trusteeIds.map((id) => api.api.userDetail(id));
      const results = await Promise.allSettled(promises);

      const map: Record<string, UserDto> = {};
      results.forEach((r, idx) => {
        if (r.status === "fulfilled") {
          const id = trusteeIds[idx];
          map[id] = r.value.data;
        }
      });
      setUserMap(map);
    } catch {
      toast.error("Failed to load ratings");
    }
  }, [page, selectedUser]);

  const fetchUsers = async (name: string) => {
    try {
      const res = await api.api.userList({ Name: name });
      setUsers(res.data ?? []);
    } catch {
      setUsers([]);
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchRatings();
  }, [fetchRatings, token]);

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    await fetchRatings();
  };

  const startEdit = (rating: TrustRatingDto) => {
    const id = rating.id;
    if (id !== undefined) {
      setEditing((s) => ({ ...s, [id]: { trustValue: rating.trustValue, comment: rating.comment } }));
    }
  };

  const cancelEdit = (id: number) => {
    setEditing((s) => {
      const copy = { ...s };
      delete copy[id];
      return copy;
    });
  };

  const saveEdit = async (id: number) => {
    const update = editing[id];
    if (!update) return;
    try {
      await api.api.trustRatingUpdate(id, update);
      toast.success("Rating updated");
      cancelEdit(id);
      fetchRatings();
    } catch {
      toast.error("Update failed");
    }
  };

  const deleteRating = async (id?: number) => {
    if (!id) return;
    try {
      await api.api.trustRatingDelete(id);
      toast.success("Rating deleted");
      fetchRatings();
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  if (!token) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">My Ratings</h1>

      <RatingsSearch
        users={users}
        selectedUser={selectedUser}
        userName={userName}
        fetchUsers={fetchUsers}
        setSelectedUser={setSelectedUser}
        setUserName={setUserName}
        onSearch={onSearch}
      />

      <RatingsList
        ratings={ratings}
        users={userMap}
        editing={editing}
        setEditing={setEditing}
        onStartEdit={startEdit}
        onCancelEdit={cancelEdit}
        onSaveEdit={saveEdit}
        onDelete={deleteRating}
      />

      <div className="mt-4">
        <Paginator page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default RatingsPage;
