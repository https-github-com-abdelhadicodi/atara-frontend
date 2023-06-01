import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function PrivateRoutes() {
  const isAuthenticated = Cookies.get("admin-token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/home" />;
}

export default PrivateRoutes;