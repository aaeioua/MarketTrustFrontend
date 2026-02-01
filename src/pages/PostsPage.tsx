import React, { useEffect, useState, useCallback } from "react";
import api from "@/lib/apiClient";
import { useAuth } from "@/contexts/AuthContext";
import type { PostDto, UserDto, CategoryDto } from "@/Api";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import PostsList from "@/components/posts-list";
import Paginator from "@/components/paginator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import UseGeolocationButton from "@/components/use-geolocation-button";
import { ArrowRight, ChevronDownIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const PAGE_SIZE = 25;

type PostQuery = {
  Title?: string;
  Content?: string;
  CategoryId?: number;
  Longitude?: number;
  Latitude?: number;
  SearchRadius?: number;
  D?: number;
  IsPriceAscending?: boolean;
  Page?: number;
  PageSize?: number;
};

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryDto | null>(null);
  const [longitude, setLongitude] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [searchRadius, setSearchRadius] = useState<string>("");
  const [d, setD] = useState<string>("");
  const [priceSort, setPriceSort] = useState<string | undefined>(undefined);
  const { token } = useAuth();
  const [users, setUsers] = useState<Record<string, UserDto>>({});

  const fetchPosts = useCallback(async () => {
    try {
      const categoryId: number | undefined = selectedCategory?.id ?? undefined;

      const query: PostQuery = {
        Title: title,
        Content: content,
        CategoryId: categoryId,
        Page: page,
        PageSize: PAGE_SIZE,
      };

      const parsedLongitude = longitude === "" ? undefined : Number(longitude);
      const parsedLatitude = latitude === "" ? undefined : Number(latitude);
      const parsedSearchRadius = searchRadius === "" ? undefined : Number(searchRadius);
      const parsedD = d === "" ? undefined : Number(d);

      if (!Number.isNaN(parsedLongitude)) query.Longitude = parsedLongitude;
      if (!Number.isNaN(parsedLatitude)) query.Latitude = parsedLatitude;
      if (!Number.isNaN(parsedSearchRadius)) query.SearchRadius = parsedSearchRadius;
      if (typeof parsedD === "number" && !Number.isNaN(parsedD) && token) query.D = parsedD;

      if (priceSort === "ascending") query.IsPriceAscending = true;
      else if (priceSort === "descending") query.IsPriceAscending = false;

      const res = await api.api.postList(query);
      const data = res.data ?? [];
      setPosts(data);

      const userIds = data
        .map((post) => post.userId)
        .filter((id): id is string => typeof id === "string");
      const userPromises = userIds.map((id) => api.api.userDetail(id));
      const userResults = await Promise.allSettled(userPromises);

      const userMap: Record<string, UserDto> = {};
      userResults.forEach((r, idx) => {
        if (r.status === "fulfilled") {
          const userId = userIds[idx];
          userMap[userId] = r.value.data;
        }
      });
      setUsers(userMap);
    } catch {
      toast.error("Failed to load posts");
    }
  }, [title, content, selectedCategory, page, longitude, latitude, searchRadius, d, priceSort, token]);

  const fetchCategories = async (name: string) => {
    try {
      const catRes = await api.api.categoryList({ Name: name});
      const categories = catRes.data ?? [];
      setCategories(categories);
    } catch {
      toast.error("Failed to load categories");
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    await fetchPosts();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Posts</h1>

      <div className="flex gap-2">
        <Collapsible className="data-[state=open] rounded-md flex-1">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="group w-full">
              Filters
              <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <form onSubmit={onSearch} className="flex flex-col gap-3 mt-3">
            <div className="flex gap-2 w-full">
              <Input className="flex-1" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <Input className="flex-1" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
            </div>

            <div className="flex gap-2 w-full items-center">
              <UseGeolocationButton
                onLocation={(lng, lat) => {
                  setLongitude(String(lng));
                  setLatitude(String(lat));
                }}
                useStored={true}
                variant="outline"
              />
              <Input className="w-36" placeholder="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
              <Input className="w-36" placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
              <Input className="w-48" placeholder="Search radius (meters)" value={searchRadius} onChange={(e) => setSearchRadius(e.target.value)} />
            </div>

            <div className="flex gap-2 w-full items-center">
              <div className="w-60">
                <Combobox
                  items={categories}
                  itemToStringValue={(c) => c?.name ?? ""}
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
                      {(cat: CategoryDto) => (
                        <ComboboxItem key={cat.id} value={cat}>
                          {cat.name}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>

              <Input placeholder="Bias towards global ratings (0-1)" value={d} onChange={(e) => setD(e.target.value)} disabled={!token} />
              <Button type="submit">Search</Button>
            </div>
            </form>
          </CollapsibleContent>
        </Collapsible>

        <Select value={priceSort ?? ""} onValueChange={(v) => setPriceSort(v === "none" ? undefined : v)}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="ascending">Price: Low <ArrowRight /> High</SelectItem>
            <SelectItem value="descending">Price: High <ArrowRight /> Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Separator className="my-4" />
      <PostsList posts={posts} users={users} />
      <Separator className="my-4" />
      <Paginator page={page} setPage={setPage} />
    </div>
  );
};

export default PostsPage;
