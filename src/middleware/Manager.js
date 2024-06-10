import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";
const Manager = () => {
  const auth = getAuthUser();
  return (
    <>
      {auth && auth.userRole === "MANAGER" ? (
        <Outlet />
      ) : (
        <Navigate to={`/login`} />
      )}
    </>
  );
};
export default Manager;
