import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { getAuthUser } from "../../helper/Storage";
function ShowManagers() {
  const logData = getAuthUser();
  const [Managers, setManagers] = useState([]);
  const branches_api = `http://localhost:9090/owners/get-all-managers`;
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
        setManagers(data);
      })
      .catch((error) => {
        console.log("There was a problem with the fetch operation:", error);
      });
  }, []);
  const NameAdded = Managers.map((Manager) => {
    const image = `${Manager.image}`;

    const name = `${Manager.firstName} ${Manager.lastName}`;
    return { image, name, ...Manager };
  });
  const updatedManagersArray = NameAdded.map((manager) => {
    const {
      phoneNumber,
      birthday,
      branchId,
      userRole,
      managerId,
      firstName,
      lastName,
      password,
      score,
      email,
      workerStatus,
      baseSalary,
      bonus,
      ...rest
    } = manager;
    return rest;
  });
  return (
    <>
      <Table data={updatedManagersArray} role="Owner" link="Managers" />
    </>
  );
}

export default ShowManagers;
