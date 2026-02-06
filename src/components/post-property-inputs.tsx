import React from "react";
import { Input } from "@/components/ui/input";
import type { PropertyDto } from "@/Api";
import { Field, FieldLabel } from "@/components/ui/field";

type Props = {
  properties: PropertyDto[];
  values: Record<number, string>;
  setValue: (propertyId: number, value: string) => void;
};

const PostPropertyInputs: React.FC<Props> = ({ properties, values, setValue }) => {
  return (
    <div className="space-y-3">
      {properties.map((property) => (
        <Field key={property.id}>
          <FieldLabel>
            {property.name}
            {property.isMandatory && <span className="text-destructive">*</span>}
          </FieldLabel>
          <Input
            value={values[Number(property.id)] ?? ""}
            onChange={(e) => setValue(Number(property.id), e.target.value)}
            required={!!property.isMandatory}
            placeholder={property.name ?? "Property"}
          />
        </Field>
      ))}
    </div>
  );
};

export default PostPropertyInputs;
