import { Route, Routes, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile as queryFn } from "services/user";
import Loader from "components/modules/Loader";

//Pages
import HomePage from "pages/HomePage";
import AuthPage from "pages/AuthPage";
import DashboardPage from "pages/DashboardPage";
import AdminPage from "pages/AdminPage";
import PageNotFound from "pages/404";

function Router() {
  const { data, isPending, error } = useQuery({
    queryKey: ["profile"],
    queryFn,
  });
  console.log({ data, isPending, error });

  if (isPending) return <Loader />;

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route
        path="dashboard"
        element={data ? <DashboardPage /> : <Navigate to="/auth" />}
      />
      <Route
        path="auth"
        element={data ? <Navigate to="/dashboard" /> : <AuthPage />}
      />
      <Route
        path="admin"
        element={
          data && data.data.role === "ADMIN" ? (
            <AdminPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
