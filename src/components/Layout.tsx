import React from "react";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
      <Toaster />
    </div>
  );
};

export default Layout;
