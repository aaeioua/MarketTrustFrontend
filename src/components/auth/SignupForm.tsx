import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { RegisterDto } from "@/Api";

type SignupFormProps = {
  onSubmit?: (data: RegisterDto) => Promise<void> | void;
};

export const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const username = (fd.get("username") as string) || "";
    const email = (fd.get("email") as string) || "";
    const password = (fd.get("password") as string) || "";
    await onSubmit?.({ userName: username, email, password });
  };

  return (
    <div className="flex justify-center items-start pt-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your information below to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup className="space-y-2">
              <div>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input id="username" name="username" type="text" placeholder="Username" required />
              </div>

              <div>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" name="email" type="email" placeholder="email@example.com" required />
              </div>

              <div>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" name="password" type="password" required />
              </div>

              <div className="mt-4 flex justify-end">
                <Button type="submit">Create Account</Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm;
