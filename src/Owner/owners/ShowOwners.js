import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { getAuthUser } from "../../helper/Storage";
function ShowOwners() {
  const logData = getAuthUser();
  const [Owners, setOwners] = useState([]);
  const branches_api = `http://localhost:9090/owners/get-all`;
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
        setOwners(data);
      })
      .catch((error) => {
        console.log("There was a problem with the fetch operation:", error);
      });
  }, []);
  const NameAdded = Owners.map((Owner) => {
    const image = `${Owner.image}`;

    const name = `${Owner.firstName} ${Owner.lastName}`;
    return { image, name, ...Owner };
  });
  const updatedOwnersArray = NameAdded.map((owner) => {
    const {
      birthday,
      userRole,
      firstName,
      lastName,
      password,
      ownerPermission,
      ...rest
    } = owner;
    return rest;
  });
  return (
    <>
      <Table data={updatedOwnersArray} role="Owner" link="Owners" />
    </>
  );
}

export default ShowOwners;
