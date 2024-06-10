import { useEffect, useState } from "react";
import { getAuthUser, getUserData } from "../helper/Storage";
import OrderCard from "../components/OrderCard";
import { Oval } from "react-loader-spinner";
function Home() {
  const logData = getAuthUser();
  const userData = getUserData();
  const [orders, setOrders] = useState([]);
  const Workers_api = `http://localhost:9090/managers/get-all-orders-by-branch-id/${userData.branchId}`;
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
        setOrders(data);
      })
      .catch((error) => {
        console.log("There was a problem with the fetch operation:", error);
      });
  }, []);
  const cards = () => {
    return (
      <>
        <div className="cardList">
          {orders.map((data) => (
            <OrderCard Data={data} id={data.id} />
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

export default Home;
