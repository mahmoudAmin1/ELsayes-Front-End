import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { getAuthUser } from "../../helper/Storage";
function ShowWorkers() {
  const logData = getAuthUser();
  const [Customers, setCustomers] = useState([]);
  const customers_api = `http://localhost:9090/managers/get-all-customers`;
  useEffect(() => {
    fetch(customers_api, {
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
        setCustomers(data);
      })
      .catch((error) => {
        console.log("There was a problem with the fetch operation:", error);
      });
  }, []);
  const NameAdded = Customers.map((Customer) => {
    const image = `${Customer.image}`;
    const name = `${Customer.firstName} ${Customer.lastName}`;
    return { image, name, ...Customer };
  });
  const updatedCustomersArray = NameAdded.map((Customer) => {
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
      freeTrialCode,
      currentBranchId,
      ...rest
    } = Customer;
    return rest;
  });

  return (
    <>
      <Table data={updatedCustomersArray} role="Customers" link="Customers" />
    </>
  );
}

export default ShowWorkers;
