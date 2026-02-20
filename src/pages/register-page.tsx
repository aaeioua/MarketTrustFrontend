import React, { useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import SignupForm from "@/components/signup-form";
import { useAuth } from "@/contexts/auth-context";
import type { RegisterDto } from "@/Api";
import { toast } from "sonner";

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const loadingToastRef = useRef<string | number | null>(null);

  const handleSubmit = async (data: RegisterDto) => {
    await register(data);
    if (localStorage.getItem("token")) navigate("/");
  };

  useEffect(() => {
    if (loading) {
      loadingToastRef.current = toast.loading("Creating account…");
    } else {
      if (loadingToastRef.current) {
        toast.dismiss(loadingToastRef.current);
        loadingToastRef.current = null;
      }
    }
  }, [loading]);

  return (
    <div>
      <SignupForm onSubmit={handleSubmit} />
      <div className="text-center mt-4">
        Already have an account? <Link to="/login" className="underline">Sign in</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
