import * as ReactDOM from "react-dom";

import { useState } from "react";
import "../css/Table.css";
import { useNavigate } from "react-router-dom";
import { getAuthUser, getUserData } from "../helper/Storage";
import Swal from "sweetalert2";
import axios from "axios";
import { Oval } from "react-loader-spinner";

function Table(props) {
  const logData = getAuthUser();
  const navigate = useNavigate();
  let users = props.data;
  let navLink = props.link;

  const AddPackage = async (ID) => {
    try {
      const resp = await axios.post(
        "http://localhost:9090/managers/add-package-to-branch",
        {
          packageId: ID,
          branchId: getUserData().branchId, // Corrected usage of getUserData
        },
        {
          headers: {
            Authorization:
              "Basic " + btoa(logData.username + ":" + logData.password),
          },
        }
      );
      Swal.fire("Added Successfully!", "", "success");
    } catch (err) {
      // console.log("There was a problem with the fetch operation:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.response.data.message}`,
      });
    }
  };

  const Update = async (link, serviceID) => {
    console.log(link);

    try {
      const resp = await axios.put(
        link, // Not sure what ActiveLink is, you might need to adjust this part
        {
          serviceId: serviceID,
          branchId: getUserData().branchId, // Corrected usage of getUserData
        },
        {
          headers: {
            Authorization:
              "Basic " + btoa(logData.username + ":" + logData.password),
          },
        }
      );
      Swal.fire({
        confirmButtonText: "ok",
        icon: "success",
        text: "Updated Successfully!",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (err) {
      console.log("There was a problem with the fetch operation:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.response.data.message}`,
      });
    }
  };
  const UpdatePack = async (link, ID) => {
    console.log(link);

    try {
      const resp = await axios.put(
        link, // Not sure what ActiveLink is, you might need to adjust this part
        {
          packageId: ID,
          branchId: getUserData().branchId, // Corrected usage of getUserData
        },
        {
          headers: {
            Authorization:
              "Basic " + btoa(logData.username + ":" + logData.password),
          },
        }
      );
      Swal.fire({
        confirmButtonText: "ok",
        icon: "success",
        text: "Updated Successfully!",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (err) {
      console.log("There was a problem with the fetch operation:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.response.data.message}`,
      });
    }
  };
  const toUpper = function (x) {
    return x.toUpperCase();
  };
  const ThData = () => {
    return (
      <>
        {Object.keys(users[0])
          .map(toUpper)
          .map((data) => (
            <th key={data}>
              {data === "ID"
                ? ""
                : data === "AVAILABLEINBRANCH"
                ? ""
                : data === "ORIGINALTOTALPRICE"
                ? "BEFORE DISCOUNT"
                : data === "ORIGINALTOTALREQUIREDTIME"
                ? "TOTALTIME"
                : data === "CURRENTPACKAGEPRICE"
                ? "AFTER DISCOUNT"
                : data}
            </th>
          ))}
        <th key="operations">OPERATIONS</th>
      </>
    );
  };

  const tdData = () => {
    return users.map((data) => {
      return (
        <tr key={data.id}>
          {Object.keys(data).map((v) => {
            return (
              <td key={data[v]}>
                {v === "image" ? (
                  <img
                    className="rounded-circle border border-dark"
                    src={`data:image/*;base64,${data[v]}`}
                    alt="error"
                    width={48}
                    height={48}
                  />
                ) : v === "id" ? (
                  ""
                ) : v === "description" ? (
                  `${data[v].slice(0, 25)}...`
                ) : (
                  data[v]
                )}
              </td>
            );
          })}
          <td>
            {(props.role === "TopServices" ||
              props.role === "workers" ||
              props.role === "Owner" ||
              props.role === "Customers") && (
              <>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() =>
                    navigate(
                      `/${logData.userRole}/Delete/${navLink}/${data.id}`
                    )
                  }
                >
                  Delete
                </button>
                <span> | </span>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() =>
                    navigate(
                      `/${logData.userRole}/Update/${navLink}/${data.id}`
                    )
                  }
                >
                  Update
                </button>
              </>
            )}
            {props.role === "TopPackages" && (
              <button
                className="btn btn-sm btn-danger"
                onClick={() =>
                  navigate(`/${logData.userRole}/Delete/${navLink}/${data.id}`)
                }
              >
                Delete
              </button>
            )}
            {(props.role === "TopServices" || props.role === "TopPackages") && (
              <>
                <span> | </span>
                {props.role === "TopServices" ? (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() =>
                      navigate(
                        `/${logData.userRole}/Add/${navLink}ToBranch/${data.id}`
                      )
                    }
                  >
                    Add Service to branch
                  </button>
                ) : (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() =>
                      navigate(
                        `/${logData.userRole}/Add/${navLink}ToBranch/${data.id}`
                      )
                    }
                  >
                    Add Package To branch
                  </button>
                )}
              </>
            )}

            {(props.role === "services" || props.role === "packages") && (
              <>
                {data.availableInBranch === true ? (
                  props.role === "services" ? (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        Update(
                          "http://localhost:9090/managers/deactivate-service-in-branch",
                          data.id
                        );
                      }}
                    >
                      deActive Service
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        UpdatePack(
                          "http://localhost:9090/managers/deactivate-package-in-branch",
                          data.id
                        );
                      }}
                    >
                      deActive Package
                    </button>
                  )
                ) : props.role === "services" ? (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => {
                      Update(
                        "http://localhost:9090/managers/activate-service-in-branch",
                        data.id
                      );
                    }}
                  >
                    Active service
                  </button>
                ) : (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => {
                      UpdatePack(
                        "http://localhost:9090/managers/activate-package-in-branch",
                        data.id
                      );
                    }}
                  >
                    Active Package
                  </button>
                )}
              </>
            )}
          </td>
        </tr>
      );
    });
  };

  if (props.data.length === 0) {
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

  return (
    <>
      <div id="myTable" className="table-responsive sm-10">
        <table className="table tableHigh">
          <thead className="thead-light">
            <tr>{ThData()}</tr>
          </thead>
          <tbody>{tdData()}</tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
