import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = () => {
    const { admin, isAuthenticated } = useSelector((state) => state.persisted.admin);
  
    return admin && isAuthenticated ? <Outlet /> : <Navigate to="/admin" />;
  };
  
  export const PublicRoute = () => {
    const { admin, isAuthenticated } = useSelector((state) => state.persisted.admin);
  
    return admin && isAuthenticated ? <Navigate to="/admin/home" /> : <Outlet />;
  };
  
