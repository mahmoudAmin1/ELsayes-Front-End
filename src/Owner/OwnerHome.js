import { useEffect, useState } from "react";
import { getAuthUser, getUserData } from "../helper/Storage";
import Card from "../components/Card";
import "../css/TopManagerHome.css";
import { Oval } from "react-loader-spinner";
function OwnerHome() {
  const logData = getAuthUser();
  const [orders, setOrders] = useState([]);
  const Workers_api = `http://localhost:9090/managers/get-all-services`;
  useEffect(() => {
    const fetchWorkers = async () => {
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
        setOrders(data);
      } catch (error) {
        console.log("There was a problem with the fetch operation:", error);
      }
    };

    fetchWorkers();
  }, [Workers_api, logData]);

  const cards = () => {
    return (
      <>
        <div className="cardList">
          {orders.map((data) => (
            <Card Data={data} />
          ))}
        </div>
      </>
    );
  };
  if (orders.length === 0) {
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
  return <>{cards()} </>;
}

export default OwnerHome;
