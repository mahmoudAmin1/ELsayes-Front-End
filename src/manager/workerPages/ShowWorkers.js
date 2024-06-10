import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { getAuthUser, getUserData } from "../../helper/Storage";
function ShowWorkers() {
  const logData = getAuthUser();
  const userData = getUserData();
  const [workers, setWorkers] = useState([]);
  const Workers_api = `http://localhost:9090/managers/get-all-workers-by-branchId/${userData.branchId}`;
  useEffect(() => {
    fetch(Workers_api, {
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
        setWorkers(data);
      })
      .catch((error) => {
        console.log("There was a problem with the fetch operation:", error);
      });
  }, []);
  const NameAdded = workers.map((worker) => {
    const image = `${worker.image}`;

    const name = `${worker.firstName} ${worker.lastName}`;
    return { image, name, ...worker };
  });
  const updatedWorkersArray = NameAdded.map((worker) => {
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
    } = worker;
    return rest;
  });
  console.log(workers);

  return (
    <>
      <Table data={updatedWorkersArray} role="workers" link="workers" />
    </>
  );
}

export default ShowWorkers;
