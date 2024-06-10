import Table from "../../components/Table";
import { useEffect, useState } from "react";
import { getAuthUser, getUserData } from "../../helper/Storage";
function ShowServices() {
  const userData = getUserData();
  const loginData = getAuthUser();
  const services_api = `http://localhost:9090/managers/get-all-service-by-branch-id/${userData.branchId}`;
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(services_api, {
          method: "GET",
          headers: {
            Authorization:
              "Basic " + btoa(loginData.username + ":" + loginData.password),
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setServices(data);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const arangedaArray = services.map((service) => {
    const image = `${service.image}`;
    return { image, ...service };
  });
  const updatedServicesArray = arangedaArray.map((service) => {
    const {
      availableInBranch,
      profitOfDay,
      profitOfMonth,
      profitOfYear,
      ...rest
    } = service;
    return rest;
  });
  return <Table data={updatedServicesArray} role="services" />;
}

export default ShowServices;
