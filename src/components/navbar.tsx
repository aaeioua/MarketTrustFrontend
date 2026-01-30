import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ModeToggle } from "./mode-toggle";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { token, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full border-b backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-lg font-semibold">
            MarketTrust
          </Link>
          <Link to="/posts" className="text-sm hover:underline">
            Posts
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {!token ? (
            <>
              <Link to="/login">
                <Button size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="sm">
                  Register
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/account" className="text-sm underline">{user?.name}</Link>
              <Button size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
