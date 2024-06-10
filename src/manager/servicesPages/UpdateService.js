import { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import "../../css/Update.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Oval } from "react-loader-spinner";
import { getAuthUser, getUserData } from "../../helper/Storage";
import { useNavigate, useParams } from "react-router-dom";
function UpdateService() {
  let { id } = useParams();
  const navigate = useNavigate();
  const userData = getUserData();
  const LogData = getAuthUser();
  const [Service, setService] = useState([]);
  const [Update, setUpdate] = useState({
    name: "",
    description: "",
    image: Service.image,
    price: "",
    requiredTime: "",
    serviceCategory: "",
    managerId: userData.managerId,
    loading: false,
    err: null,
  });
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");
      setUpdate({ ...Update, image: base64String });
    };

    reader.readAsDataURL(file);
  };
  const Updatefun = (e) => {
    console.log(userData);
    e.preventDefault();
    setUpdate({ ...Update, loading: true, err: [] });
    axios
      .put(
        `http://localhost:9090/managers/update-service/${id}`,
        {
          name: Update.name,
          description: Update.description,
          image: Update.image,
          price: Update.price,
          requiredTime: Update.requiredTime,
          serviceCategory: Update.serviceCategory,
          managerId: userData.id,
        },
        {
          headers: {
            Authorization:
              "Basic " + btoa(LogData.username + ":" + LogData.password),
          },
        }
      )
      .then((resp) => {
        console.log(Update);
        setUpdate({ ...Update, loading: false, err: [] });
        Swal.fire("Updated Successfully!", "", "success").then((e) => {
          navigate(`/${LogData.userRole}`);
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
    fetch(`http://localhost:9090/managers/get-service-by-id/${id}`, {
      method: "GET",
      headers: {
        Authorization:
          "Basic " + btoa(LogData.username + ":" + LogData.password),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setService(data);
        setUpdate(data);
      });
  }, []);

  if (Service.length === 0) {
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
        <div class="text-center">
          <img
            src={`data:image/*;base64,${Update.image}`}
            className="rounded-circle border center"
            alt="error"
            width={132}
            height={132}
          />
          <label for="file-upload" class="custom-file-upload  btn btn-success">
            Update photo
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e)}
          />

          {Update.image !== Service.image && (
            <button
              class="custom-file-upload btn btn-danger"
              onClick={(e) => {
                e.preventDefault();
                setUpdate({ ...Update, image: Service.image });
              }}
            >
              Cancel
            </button>
          )}
        </div>
        <div class="form-row row">
          <div class="form-group col-md-6">
            <label for="name">service Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              defaultValue={Service.name}
              placeholder="service Name"
              onChange={(e) => setUpdate({ ...Update, name: e.target.value })}
            />
          </div>
          <div class="form-group col-md-6">
            <label for="price">price</label>
            <input
              type="number"
              class="form-control"
              id="price"
              defaultValue={Service.price}
              placeholder="price"
              onChange={(e) => setUpdate({ ...Update, price: e.target.value })}
            />
          </div>
        </div>
        <div class="form-row row">
          <div class="form-group">
            <label for="description">description</label>
            <input
              type="text"
              class="form-control"
              id="description"
              defaultValue={Service.description}
              placeholder="description"
              onChange={(e) =>
                setUpdate({ ...Update, description: e.target.value })
              }
            />
          </div>
        </div>

        <div className="from-row row">
          <div class="form-group col-md-6">
            <label for="requiredTime">required Time</label>
            <input
              type="number"
              class="form-control"
              id="requiredTime"
              defaultValue={Service.requiredTime}
              placeholder="required Time"
              onChange={(e) =>
                setUpdate({ ...Update, requiredTime: e.target.value })
              }
            />
          </div>
          <div class="form-group col-md-6">
            <label for="serviceCategory">service Category:</label>
            <select
              id="serviceCategory"
              name="serviceCategory"
              class="form-control"
              defaultValue={Service.serviceCategory}
              onChange={(e) =>
                setUpdate({ ...Update, serviceCategory: e.target.value })
              }
            >
              <option value="TAKE_AWAY_SERVICE">Take Away Service</option>
              <option value="CLEANING_SERVICE">Cleaning Service</option>
              <option value="MAINTENANCE_SERVICE">Maintenance Service</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-success my-2 update-btn mt-4"
          onClick={Updatefun}
        >
          Update
        </button>
      </form>
    </>
  );
}

export default UpdateService;
