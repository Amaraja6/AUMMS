import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ authorized, setAuthorized }) => {
  return authorized ? (
    <Navigate to={"/search"} />
  ) : (
    <Outlet setAuthorized={setAuthorized} />
  );
};
export default ProtectedRoute;
