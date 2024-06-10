import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { getAuthUser, getUserData } from "../../helper/Storage";
function ShowAllWorkers() {
  const logData = getAuthUser();
  const [workers, setWorkers] = useState([]);
  const Workers_api = `http://localhost:9090/managers/get-all-workers`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(Workers_api, {
          method: "GET",
          headers: {
            Authorization:
              "Basic " + btoa(logData.username + ":" + logData.password),
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setWorkers(data);
      } catch (error) {
        console.log("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
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
      userRole,
      managerId,
      firstName,
      lastName,
      password,
      score,
      baseSalary,
      bonus,
      workerStatus,
      email,
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

export default ShowAllWorkers;
