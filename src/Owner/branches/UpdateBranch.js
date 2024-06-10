import { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import "../../css/Update.css";
import axios from "axios";
import Swal from "sweetalert2";
import { getAuthUser } from "../../helper/Storage";
import { useNavigate, useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";

function UpdateBranch() {
  const navigate = useNavigate();
  let { id } = useParams();
  const logData = getAuthUser();
  const [data, setData] = useState("");
  const [Update, setUpdate] = useState({
    name: "",
    location: "",
    capacityOfCars: "",
    loading: false,
    err: null,
  });

  const Updatefun = (e) => {
    e.preventDefault();
    console.log(logData);
    setUpdate({ ...Update, loading: true, err: [] });
    axios
      .put(
        `http://localhost:9090/owners/update-branch/${id}`,
        {
          name: Update.name,
          location: Update.location,
          capacityOfCars: Update.capacityOfCars,
          ownerId: logData.id,
        },
        {
          headers: {
            Authorization:
              "Basic " + btoa(logData.username + ":" + logData.password),
          },
        }
      )
      .then((resp) => {
        setUpdate({ ...Update, loading: false, err: [] });
        Swal.fire("Updated Successfully!", "", "success").then((e) => {
          navigate(`/${logData.userRole}/Show/Branches`);
        });
      })
      .catch((err) => {
        if (err.response.status === 400 || err.response.status === 422) {
          setUpdate({
            ...Update,
            loading: false,
            err: err.response.data.message,
          });
        } else {
          setUpdate({
            ...Update,
            loading: false,
            err: "Something went wrong",
          });
        }
      });
  };
  useEffect(() => {
    fetch(`http://localhost:9090/owners/get-branch-by-id/${id}`, {
      method: "GET",
      headers: {
        Authorization:
          "Basic " + btoa(logData.username + ":" + logData.password),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setUpdate(data);
      });
  }, []);

  if (data.length === 0) {
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
        <div className="form-row row">
          <div className="form-group col-md-6">
            <label for="name">Branch Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              defaultValue={data.name}
              placeholder="Branch Name"
              onChange={(e) => setUpdate({ ...Update, name: e.target.value })}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="location">location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              defaultValue={data.location}
              placeholder="location"
              onChange={(e) =>
                setUpdate({ ...Update, location: e.target.value })
              }
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
              defaultValue={data.capacityOfCars}
              placeholder="capacityOfCars"
              onChange={(e) =>
                setUpdate({ ...Update, capacityOfCars: e.target.value })
              }
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary my-2 update-btn mt-4"
          onClick={Updatefun}
        >
          Update
        </button>
      </form>
    </>
  );
}

export default UpdateBranch;
