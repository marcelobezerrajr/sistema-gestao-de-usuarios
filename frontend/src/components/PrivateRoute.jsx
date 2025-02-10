import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const PrivateRoute = () => {
  const { user, loading } = useLogin();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
