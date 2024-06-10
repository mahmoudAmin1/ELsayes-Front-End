import { useState } from "react";
import "react-phone-number-input/style.css";
import "../../css/Update.css";
import axios from "axios";
import Swal from "sweetalert2";
import { getAuthUser } from "../../helper/Storage";
import { useNavigate } from "react-router-dom";

function AddBranch() {
  const navigate = useNavigate();
  const logData = getAuthUser();
  const [Add, setAdd] = useState({
    name: "",
    location: "",
    capacityOfCars: "",
    ownerId: logData.id,
    loading: false,
    err: null,
  });

  const Addfun = (e) => {
    console.log(logData);
    e.preventDefault();
    setAdd({ ...Add, loading: true, err: [] });
    axios
      .post(
        `http://localhost:9090/owners/add-branch`,
        {
          name: Add.name,
          location: Add.location,
          capacityOfCars: Add.capacityOfCars,
          ownerId: Add.ownerId,
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
  return (
    <>
      <form className="p-2">
        <div className="form-row row">
          <div className="form-group col-md-6">
            <label for="name">Branch Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Branch Name"
              onChange={(e) => setAdd({ ...Add, name: e.target.value })}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="location">location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              placeholder="location"
              onChange={(e) => setAdd({ ...Add, location: e.target.value })}
            />
          </div>
        </div>
        <div className="form-row row">
          <div className="form-group col-md-6">
            <label for="capacityOfCars">capacityOfCars</label>
            <input
              type="number"
              className="form-control"
              id="capacityOfCars"
              placeholder="capacityOfCars"
              onChange={(e) =>
                setAdd({ ...Add, capacityOfCars: e.target.value })
              }
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary my-2 update-btn mt-4"
          onClick={Addfun}
        >
          Add
        </button>
      </form>
    </>
  );
}

export default AddBranch;
