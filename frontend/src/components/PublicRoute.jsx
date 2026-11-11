import { Navigate, Outlet } from "react-router-dom";

function PublicRoute() {
  const token = sessionStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
