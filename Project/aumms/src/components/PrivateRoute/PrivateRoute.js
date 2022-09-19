import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = ({ authorized, setAuthorized }) => {
  return authorized ? (
    <Outlet setAuthorized={setAuthorized} />
  ) : (
    <Navigate to={"/login"} />
  );
};
export default PrivateRoute;
