import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

import { Outlet } from "react-router-dom";
const FirstTimeRegister = () => {
  const [Exist, setExist] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:9090/owners/main-owner-is-exist",
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setExist(data);
      } catch (error) {
        console.log("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, []);
  if (Exist.length === 0) {
    return (
      <Oval
        visible={true}
        height="200"
        width="200"
        color="blue"
        secondaryColor="#2778c4"
        ariaLabel="oval-loading"
        wrapperClass="spinner"
      />
    );
  }
  return <>{!Exist ? <Outlet /> : ""}</>;
};
export default FirstTimeRegister;
