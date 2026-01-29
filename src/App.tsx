import "./index.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import { setAuthToken } from "@/lib/apiClient";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/theme-provider";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";

/* async function apitest() {
  const api = new api({
    baseurl: import.meta.env.vite_api_base_url,
    securityworker: (securitydata) => securitydata
        ? { headers: { authorization: `bearer ${securitydata}` } }
        : {},
  });

  const loginres = await api.api.accountlogincreate({ name: "string", password: "aa!123456789" });
  console.log(loginres);
  const logindata = loginres.data;
  if (logindata?.token) {
    localstorage.setitem("token", logindata.token);
  }
  const token = localstorage.getitem("token");
  console.log("token:", token);
  api.setsecuritydata(token);

  const res = await api.api.userlist({name: "string", email: "user"});
  console.log(res);
  const data = res.data;
  console.log(data);

  const res2 = await api.api.postcreate({title: "new post", content: "this is the content of the new post.", categoryid: 1});
  console.log(res2);
  const data2 = res2.data;
  console.log(data2);
} */

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
