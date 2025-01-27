import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = true;
  return isLoggedIn ? children : <Navigate to="/authentication/sign-in" />;
};

export default ProtectedRoute;
