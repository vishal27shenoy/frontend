import React, { useContext } from "react";
import { UserContext } from "../context/Context";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth() {
  const { auth } = useContext(UserContext);
  console.log(auth);
  return auth?.token ? <Outlet /> : <Navigate to="/" />;
}

export default RequireAuth;
