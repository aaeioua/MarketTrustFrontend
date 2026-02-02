import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
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
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Posts</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-40">
                    <NavigationMenuLink asChild>
                      <Link to="/posts" className="text-sm hover:underline py-1">View posts</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="/create-post" className="text-sm hover:underline py-1">Create a new post</Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Ratings</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-40">
                    <NavigationMenuLink asChild>
                      <Link to="/ratings" className="text-sm hover:underline py-1">View ratings</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="/create-rating" className="text-sm hover:underline py-1">Create a new rating</Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
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
