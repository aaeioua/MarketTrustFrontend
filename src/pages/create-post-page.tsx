import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/apiClient";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
} from "@/components/ui/combobox";
import { toast } from "sonner";
import PostPropertyInputs from "@/components/post-property-inputs";
import { Currency, type CategoryDto, type CreatePostDto, type PropertyDto } from "@/Api";

const CreatePostPage: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryDto | null>(null);
  const [propertyValues, setPropertyValues] = useState<Record<number, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  useEffect(() => {
    const load = async () => {
      if (!selectedCategory?.id) {
        setPropertyValues({});
        return;
      }

      if ((selectedCategory.properties && selectedCategory.properties.length > 0) || (selectedCategory.inheritedProperties && selectedCategory.inheritedProperties.length > 0)) {
        const initial: Record<number, string> = {};
        (selectedCategory.properties ?? []).forEach((property) => {
          if (property.id) initial[property.id] = "";
        });
        (selectedCategory.inheritedProperties ?? []).forEach((property) => {
          if (property.id) initial[property.id] = "";
        });
        setPropertyValues(initial);
        return;
      }
    };
    load();
  }, [selectedCategory]);

  const fetchCategories = async (name: string) => {
    try {
      const res = await api.api.categoryList({ Name: name });
      setCategories(res.data);
    } catch {
      setCategories([]);
      toast.error("Failed to load categories");
    }
  };

  const setPropertyValue = (propertyId: number, value: string) => {
    setPropertyValues((s) => ({ ...s, [propertyId]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory?.id) {
      toast.error("Please choose a category");
      return;
    }

    setSubmitting(true);
    try {
      const data: CreatePostDto = {
        title: title,
        content: content,
        categoryId: selectedCategory.id,
        price: Number(price),
        currency: Currency.Value1
      };

      const res = await api.api.postCreate(data);
      const newPost = res.data;

      const properties: PropertyDto[] = [
        ...(selectedCategory.inheritedProperties ?? []),
        ...(selectedCategory.properties ?? []),
      ];
      for (const property of properties) {
        const value = property.id ? propertyValues[property.id] : "";
        if (value.trim() !== "") {
          try {
            await api.api.postCreate2(Number(newPost.id), { name: property.name ?? "", value: value });
          } catch {
            toast.error(`Failed to add property value for ${property.name}`);
          }
        }
      }

      toast.success("Post created");
      navigate(`/posts/${newPost.id}`);
    } catch {
      toast.error("Failed to create post");
    } finally {
      setSubmitting(false);
    }
  };

  if (!token) return null;

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl mb-4">Create Post</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field>
          <FieldLabel>Title</FieldLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Field>

        <Field>
          <FieldLabel>Content</FieldLabel>
          <FieldDescription>The main body of your post</FieldDescription>
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </Field>

        <Field>
          <FieldLabel>Category</FieldLabel>
          <FieldDescription />
          <div className="w-80">
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
                required
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
        </Field>

        <Field>
          <FieldLabel>Price</FieldLabel>
          <Input value={price} onChange={(e) => setPrice(e.target.value)} type="number" />
        </Field>

        {selectedCategory && (
          <div>
            <h2 className="text-lg mb-2">Properties</h2>
            <PostPropertyInputs
              properties={[...(selectedCategory.inheritedProperties ?? []), ...(selectedCategory.properties ?? [])]}
              values={propertyValues}
              setValue={setPropertyValue}
            />
          </div>
        )}

        <Button type="submit" disabled={submitting}>{submitting ? "Creating..." : "Create Post"}</Button>
      </form>
    </div>
  );
};

export default CreatePostPage;
