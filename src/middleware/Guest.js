import React from "react";
import { Outlet } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";
const Guest = () => {
  const auth = getAuthUser();
  return <>{!auth ? <Outlet /> : ""}</>;
};
export default Guest;
