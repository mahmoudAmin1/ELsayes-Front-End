import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";
const TopManager = () => {
  const auth = getAuthUser();
  return (
    <>
      {auth && auth.userRole === "TOP_MANAGER" ? (
        <Outlet />
      ) : (
        <Navigate to={`/login`} />
      )}
    </>
  );
};
export default TopManager;
