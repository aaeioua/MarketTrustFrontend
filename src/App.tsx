import "./index.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout";
import LoginPage from "@/pages/login-page";
import RegisterPage from "@/pages/register-page";
import { setAuthToken } from "@/lib/apiClient";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/components/theme-provider";
import HomePage from "./pages/home-page";
import AccountPage from "./pages/account-page";
import PostsPage from "./pages/posts-page";
import PostPage from "./pages/post-page";
import UserPage from "./pages/user-page";
import RatingsPage from "./pages/ratings-page";
import CreateRatingPage from "./pages/create-rating-page";
import CreatePostPage from "./pages/create-post-page";

function App() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) setAuthToken(token);
    }
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/posts" element={<PostsPage />} />
              <Route path="/posts/:id" element={<PostPage />} />
              <Route path="/users/:id" element={<UserPage />} />
              <Route path="/ratings" element={<RatingsPage />} />
              <Route path="/create-rating" element={<CreateRatingPage />} />
              <Route path="/create-post" element={<CreatePostPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/account" element={<AccountPage />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
