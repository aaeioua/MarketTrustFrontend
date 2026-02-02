import React from "react";
import { Link } from "react-router-dom";
import type { TrustRatingDto, UpdateTrustRatingDto, UserDto } from "@/Api";
import {
  Item,
  ItemGroup,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type EditingMap = Record<number, UpdateTrustRatingDto>

type Props = {
  ratings: TrustRatingDto[];
  users: Record<string, UserDto>;
  editing: EditingMap;
  setEditing: React.Dispatch<React.SetStateAction<EditingMap>>;
  onStartEdit: (rating: TrustRatingDto) => void;
  onCancelEdit: (id: number) => void;
  onSaveEdit: (id: number) => void;
  onDelete: (id?: number) => void;
};

const RatingsList: React.FC<Props> = ({ ratings, users, editing, setEditing, onStartEdit, onCancelEdit, onSaveEdit, onDelete }) => {
  return (
    <ItemGroup className="space-y-2">
      {ratings.map((rating) => (
        <Item key={rating.id} variant="outline" className="hover:bg-muted/50">
          <ItemContent>
            <ItemTitle>
              {rating.trusteeId ? (
                <Link to={`/users/${rating.trusteeId}`} className="font-medium text-primary hover:underline">
                  {users[rating.trusteeId]?.name ?? rating.trusteeId}
                </Link>
              ) : (
                "?"
              )}
            </ItemTitle>
            <ItemDescription>Rating: {rating.trustValue}</ItemDescription>
            {rating.id !== undefined && editing[rating.id] ? (
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Input
                  type="number"
                  value={String(editing[rating.id].trustValue)}
                  onChange={(e) => setEditing((s) => ({ ...s, [rating.id!]: { ...s[rating.id!], trustValue: Number(e.target.value) } }))}
                />
                <Textarea
                  value={editing[rating.id!].comment ?? ""}
                  onChange={(e) => setEditing((s) => ({ ...s, [rating.id!]: { ...s[rating.id!], comment: e.target.value } }))}
                />
              </div>
            ) : (
              <div className="mt-2 text-sm whitespace-pre-wrap">{rating.comment}</div>
            )}
          </ItemContent>
          <ItemActions>
            {rating.id !== undefined && editing[rating.id] ? (
              <>
                <Button size="sm" onClick={() => onSaveEdit(rating.id!)}>Save</Button>
                <Button variant="outline" size="sm" onClick={() => onCancelEdit(rating.id!)}>Cancel</Button>
              </>
            ) : (
              <>
                <Button size="sm" onClick={() => onStartEdit(rating)}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(rating.id)}>Delete</Button>
              </>
            )}
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  );
};

export default RatingsList;
