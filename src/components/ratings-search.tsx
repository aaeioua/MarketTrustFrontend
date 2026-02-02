import React from "react";
import type { UserDto } from "@/Api";
import { Combobox, ComboboxInput, ComboboxContent, ComboboxEmpty, ComboboxList, ComboboxItem } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";

type Props = {
  users: UserDto[];
  selectedUser: UserDto | null;
  userName: string;
  fetchUsers: (name: string) => Promise<void>;
  setSelectedUser: (u: UserDto | null) => void;
  setUserName: (s: string) => void;
  onSearch: (e: React.FormEvent) => Promise<void> | void;
};

const RatingsSearch: React.FC<Props> = ({ users, selectedUser, userName, fetchUsers, setSelectedUser, setUserName, onSearch }) => {
  return (
    <form onSubmit={onSearch} className="flex gap-2 mb-4 items-center">
      <div className="w-72">
        <Combobox items={users} itemToStringValue={(u) => u?.name ?? ""} value={selectedUser} onValueChange={setSelectedUser}>
          <ComboboxInput
            placeholder="Filter by user"
            value={selectedUser?.name ?? userName}
            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
              const name = e.target.value;
              setUserName(name);
              setSelectedUser(null);
              await fetchUsers(name);
            }}
            onFocus={() => { if (users.length === 0) fetchUsers(""); }}
          />
          <ComboboxContent>
            <ComboboxEmpty>No users</ComboboxEmpty>
            <ComboboxList>
              {(user: UserDto) => (
                <ComboboxItem key={user.id} value={user}>
                  {user.name}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
      <Button type="submit">Search</Button>
    </form>
  );
};

export default RatingsSearch;
