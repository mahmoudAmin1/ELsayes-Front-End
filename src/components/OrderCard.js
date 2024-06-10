import React, { useState } from "react";
const Card = (props) => {
  console.log(props.Data);
  const [toggle, setToggle] = useState("close");

  return (
    <div className=" card MainCard" style={{ width: "18rem" }}>
      <div className="card-body" style={{ width: "100%" }}>
        <h6 className="card-title">Customer Name: {props.Data.customerName}</h6>
        <p className="card-text"> Order Date : {props.Data.orderDate}min</p>
        {props.Data.orderFinishDate !== null ? (
          <p className="card-text">
            End Date : {props.Data.orderFinishDate}min
          </p>
        ) : (
          <p className="card-text">End Date : IN PROGRESS</p>
        )}
        <p className="card-text">Status : {props.Data.progressStatus}</p>
        <p className="card-text">Total Cost : {props.Data.orderTotalCost}</p>
        <button
          className={toggle === "close" ? "btn btn-success" : "btn btn-danger"}
          id="open"
          key={props.id}
          style={{ marginBottom: "5px" }}
          onClick={() => {
            if (toggle === "close") {
              setToggle("open");
            } else {
              setToggle("close");
            }

            // toggleFun("none", "block");
          }}
        >
          {toggle === "open" ? "Hide Details" : "Show Details"}
        </button>

        {toggle === "open" && (
          <div key={props.id}>
            {props.Data.packages.length !== 0 && (
              <>
                <h6 className="card-title">Packages</h6>
                {props.Data.packages.map((data, index) => (
                  <div key={index}>
                    <div className="card" style={{ width: "15rem" }}>
                      <div className="card-body" style={{ width: "100%" }}>
                        <p className="card-text">Name: {data.packageName}</p>
                        {data.progressStatus !== null && (
                          <p className="card-text">
                            Status: {data.progressStatus}
                          </p>
                        )}
                      </div>
                    </div>
                    <br />
                  </div>
                ))}
              </>
            )}

            {props.Data.services.length !== 0 && (
              <>
                <h6 className="card-title">Services</h6>
                {props.Data.services.map((data, index) => (
                  <div key={index}>
                    <div className="card" style={{ width: "15rem" }}>
                      <div className="card-body" style={{ width: "100%" }}>
                        <p className="card-text">Name: {data.serviceName}</p>
                        {data.workerName !== null ? (
                          <p className="card-text">
                            Worker Name : {data.workerName}
                          </p>
                        ) : (
                          <p className="card-text">
                            Status : {data.progressStatus}
                          </p>
                        )}
                      </div>
                    </div>
                    <br />
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Card;
