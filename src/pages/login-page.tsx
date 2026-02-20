import React, { useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginForm from "@/components/login-form";
import type { LoginDto } from "@/Api";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const loadingToastRef = useRef<string | number | null>(null);

  const handleSubmit = async (data: LoginDto) => {
    await login(data);
    if (localStorage.getItem("token")) navigate("/");
  };

  useEffect(() => {
    if (loading) {
      loadingToastRef.current = toast.loading("Signing in…");
    } else {
      if (loadingToastRef.current) {
        toast.dismiss(loadingToastRef.current);
        loadingToastRef.current = null;
      }
    }
  }, [loading]);

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
      <div className="text-center mt-4">
        Don't have an account? <Link to="/register" className="underline">Sign up</Link>
      </div>
    </div>
  );
};

export default LoginPage;
