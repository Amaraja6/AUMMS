import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Logout({ setAuthorized }) {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(localStorage.getItem("UserToken"));
    localStorage.removeItem("UserToken");
    setAuthorized({
      authorized: false,
      initializing: false,
    });
    navigate("/login");
  });

  return <div>Logged out</div>;
}
export default Logout;
