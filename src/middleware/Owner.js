import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";
const Owner = () => {
  const auth = getAuthUser();
  return (
    <>
      {auth && auth.userRole === "OWNER" ? (
        <Outlet />
      ) : (
        <Navigate to={`/login`} />
      )}
    </>
  );
};
export default Owner;
