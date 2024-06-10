import React from "react";
const Card = (props) => {
  console.log(props.Data);

  return (
    <div className=" card" style={{ width: "16rem" }}>
      <div className="card-img-top">
        <img
          src={`data:image/*;base64,${props.Data.image}`}
          alt="/"
          style={{ width: "100%" }}
        />
      </div>
      <div className="card-body" style={{ width: "100%" }}>
        <h6 className="card-title">Name: {props.Data.name}</h6>
        {/* <p className="card-text">
          <span className="bold">description:</span> {props.Data.description}
        </p> */}
        <p className="card-text">Price : {props.Data.price}</p>
        <p className="card-text">
          used : {props.Data.totalProfit / props.Data.price}
        </p>
        <p className="card-text">Daily Profit : {props.Data.profitOfDay}</p>
        <p className="card-text">Monthly Profit : {props.Data.profitOfMonth}</p>
        <p className="card-text">Yearly Profit : {props.Data.profitOfYear}</p>
        <p className="card-text">Total Profit : {props.Data.totalProfit}</p>
      </div>
    </div>
  );
};
export default Card;
