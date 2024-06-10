import React, { useState, useEffect, useMemo } from "react";
import "react-phone-number-input/style.css";
import "../../css/Update.css";
import axios from "axios";
import Swal from "sweetalert2";
import { getAuthUser, getUserData } from "../../helper/Storage";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import AddService from "../../components/AddService";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/AddPackage.css";
function AddPackage() {
  const navigate = useNavigate();
  const logData = getAuthUser();
  const userData = getUserData();
  const [Services, setServices] = useState([]);
  const [Add, setAdd] = useState({
    name: "",
    description: "",
    image: "",
    percentageOfDiscount: "",
    managerId: logData.id,
    serviceIds: [],
    loading: false,
    err: null,
  });

  const [servicesInputs, setServicesInputs] = useState([]);

  useEffect(() => {
    console.log("servicesInputs", servicesInputs);
  }, [servicesInputs]);

  const getAvailbleServices = (services, selectedServices, currentID) => {
    if (services.length === 0) return [];

    const newArr = [...services];

    return newArr.filter(
      (itemX) =>
        itemX.id === currentID ||
        !selectedServices.find((itemY) => itemY === itemX.id)
    );
  };

  const availableServices = useMemo(() => {
    if (Services.length === 0) return [];

    const newArr = [...Services];

    return newArr.filter(
      (itemX) => !servicesInputs.find((itemY) => itemY === itemX.id)
    );
  }, [JSON.stringify(servicesInputs), JSON.stringify(Services)]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:9090/managers/get-all-service-by-branch-id/${userData.branchId}`,
          {
            method: "GET",
            headers: {
              Authorization:
                "Basic " + btoa(logData.username + ":" + logData.password),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setServices(data);
        setServicesInputs([data[0].id]);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");
      setAdd({ ...Add, image: base64String });
    };

    reader.readAsDataURL(file);
  };

  const Addfun = (e) => {
    console.log(logData);
    e.preventDefault();
    setAdd({ ...Add, loading: true, err: [] });
    axios
      .post(
        `http://localhost:9090/managers/add-package`,
        {
          name: Add.name,
          description: Add.description,
          image: Add.image,
          percentageOfDiscount: Add.percentageOfDiscount,
          managerId: Add.managerId,
          serviceIds: Add.serviceIds,
        },
        {
          headers: {
            Authorization:
              "Basic " + btoa(logData.username + ":" + logData.password),
          },
        }
      )
      .then((resp) => {
        console.log(Add);
        setAdd({ ...Add, loading: false, err: [] });
        Swal.fire("Added Successfully!", "", "success").then((e) => {
          navigate(`/${logData.userRole}`);
        });
      })
      .catch((err) => {
        if (err.response.status === 400 || err.response.status === 422) {
          setAdd({
            ...Add,
            loading: false,
            err: err.response.data.message,
          });
        } else {
          setAdd({
            ...Add,
            loading: false,
            err: "Something went wrong",
          });
        }
      });
  };

  if (Services.length === 0) {
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
      <form className="p-2">
        <div class="form-row row">
          <div class="form-group col-md-6">
            <label for="name">package Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="package Name"
              onChange={(e) => setAdd({ ...Add, name: e.target.value })}
            />
          </div>
          <div class="form-group col-md-6">
            <label for="image">package image</label>
            <input
              type="file"
              accept="image/*"
              class="form-control"
              id="image"
              placeholder="package image"
              onChange={(e) => handleImageUpload(e)}
            />
          </div>
        </div>
        <div class="form-row row">
          <div class="form-group col-md-6">
            <label for="description">description</label>
            <input
              type="text"
              class="form-control"
              id="description"
              placeholder="description"
              onChange={(e) => setAdd({ ...Add, description: e.target.value })}
            />
          </div>
          <div class="form-group col-md-6">
            <label for="percentageOfDiscount">percentage Of Discount</label>
            <input
              type="number"
              class="form-control"
              id="percentageOfDiscount"
              placeholder="percentage Of Discount"
              onChange={(e) =>
                setAdd({ ...Add, percentageOfDiscount: e.target.value })
              }
            />
          </div>
        </div>
        {servicesInputs.length > 0 && (
          <div class="form-row row">
            <AddService
              Services={getAvailbleServices(
                Services,
                servicesInputs,
                servicesInputs[0]
              )}
              value={servicesInputs[0]}
              onChange={(value) => {
                const newArr = [...servicesInputs];
                newArr[0] = Number(value);
                setServicesInputs(newArr);
                setAdd({ ...Add, serviceIds: servicesInputs });
              }}
            />
            <div class="form-group col-md-1">
              <button
                className="add_button"
                onClick={(e) => {
                  e.preventDefault();
                  setServicesInputs((oldState) => [
                    ...oldState,
                    availableServices[0].id,
                  ]);
                }}
              >
                <i className="bi bi-plus-square-fill rounded"></i>
              </button>
            </div>
          </div>
        )}

        {servicesInputs.length > 1 &&
          servicesInputs.slice(1).map((item, index) => {
            return (
              <AddService
                Services={getAvailbleServices(
                  Services,
                  servicesInputs,
                  servicesInputs[index + 1]
                )}
                value={servicesInputs[index + 1]}
                onChange={(value) => {
                  const newArr = [...servicesInputs];
                  newArr[index + 1] = Number(value);
                  setServicesInputs(newArr);
                  setAdd({ ...Add, serviceIds: servicesInputs });
                }}
                key={index.toString()}
              />
            );
          })}

        <button
          type="submit"
          class="btn btn-primary my-2 update-btn mt-4"
          onClick={Addfun}
        >
          Add
        </button>
      </form>
    </>
  );
}

export default AddPackage;
