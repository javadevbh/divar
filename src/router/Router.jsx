import { Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile as queryFn } from "services/user";

//Pages
import PageNotFound from "pages/404";
import AdminPage from "pages/AdminPage";
import AuthPage from "pages/AuthPage";
import DashboardPage from "pages/DashboardPage";
import HomePage from "pages/HomePage";

function Router() {
  const { data, isPending, error } = useQuery({
    queryKey: ["profile"],
    queryFn,
  });
  console.log({ data, isPending, error });

  if (isPending) return <h1>Loading...</h1>;

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="auth" element={<AuthPage />} />
      <Route path="admin" element={<AdminPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
