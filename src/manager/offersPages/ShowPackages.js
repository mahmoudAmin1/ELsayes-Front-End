import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { getAuthUser, getUserData } from "../../helper/Storage";

function ShowPackages() {
  const logData = getAuthUser();
  const userData = getUserData();
  const offers_api = `http://localhost:9090/managers/get-all-packages-by-branch-id/${userData.branchId}`;
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    fetch(offers_api, {
      method: "GET",
      headers: {
        Authorization:
          "Basic " + btoa(logData.username + ":" + logData.password),
      },
    })
      .then((res) => res.json())
      .then((data) => setOffers(data));
  }, []);
  const arangedaArray = offers.map((offer) => {
    const image = `${offer.image}`;
    return { image, ...offer };
  });

  return <Table data={arangedaArray} role="packages" />;
}

export default ShowPackages;
