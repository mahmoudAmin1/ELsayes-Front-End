import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { getAuthUser, getUserData } from "../../helper/Storage";
function ShowBranches() {
  const logData = getAuthUser();
  const [Branches, setBranches] = useState([]);
  const branches_api = `http://localhost:9090/owners/get-all-branches`;
  useEffect(() => {
    fetch(branches_api, {
      method: "GET",
      headers: {
        Authorization:
          "Basic " + btoa(logData.username + ":" + logData.password),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the data
        setBranches(data);
      })
      .catch((error) => {
        console.log("There was a problem with the fetch operation:", error);
      });
  }, []);
  const updatedBranchesArray = Branches.map((service) => {
    const { profitOfYear, ...rest } = service;
    return rest;
  });
  return (
    <>
      <Table data={updatedBranchesArray} role="Owner" link="Branches" />
    </>
  );
}

export default ShowBranches;
