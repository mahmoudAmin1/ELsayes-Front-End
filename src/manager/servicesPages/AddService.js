import { useState } from "react";
import "react-phone-number-input/style.css";
import "../../css/Update.css";
import axios from "axios";
import Swal from "sweetalert2";
import { getAuthUser } from "../../helper/Storage";
import { useNavigate } from "react-router-dom";
function AddService() {
  const navigate = useNavigate();
  const userData = getAuthUser();
  const [Add, setAdd] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    requiredTime: "",
    serviceCategory: "TAKE_AWAY_SERVICE",
    managerId: userData.id,
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
      setAdd({ ...Add, image: base64String });
    };

    reader.readAsDataURL(file);
  };
  const Addfun = (e) => {
    console.log(userData);
    e.preventDefault();
    setAdd({ ...Add, loading: true, err: [] });
    axios
      .post(
        `http://localhost:9090/managers/add-service`,
        {
          name: Add.name,
          description: Add.description,
          image: Add.image,
          price: Add.price,
          requiredTime: Add.requiredTime,
          serviceCategory: Add.serviceCategory,
          managerId: Add.managerId,
        },
        {
          headers: {
            Authorization:
              "Basic " + btoa(userData.username + ":" + userData.password),
          },
        }
      )
      .then((resp) => {
        console.log(Add);
        setAdd({ ...Add, loading: false, err: [] });
        Swal.fire("Added Successfully!", "", "success").then((e) => {
          navigate(`/${userData.userRole}`);
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
            <label for="name">service Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="service Name"
              onChange={(e) => setAdd({ ...Add, name: e.target.value })}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="image">service image</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              id="serviceImageURL"
              placeholder="service image"
              onChange={(e) => handleImageUpload(e)}
            />
          </div>
        </div>
        <div className="form-row row">
          <div className="form-group">
            <label for="description">description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="description"
              onChange={(e) => setAdd({ ...Add, description: e.target.value })}
            />
          </div>
        </div>
        <div className="from-row row">
          <div className="form-group col-md-6">
            <label for="price">price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="price"
              onChange={(e) => setAdd({ ...Add, price: e.target.value })}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="requiredTime">required Time</label>
            <input
              type="number"
              className="form-control"
              id="requiredTime"
              placeholder="required Time"
              onChange={(e) => setAdd({ ...Add, requiredTime: e.target.value })}
            />
          </div>
        </div>
        <div className="from-row row">
          <div class="form-group col-md-6">
            <label for="serviceCategory">serviceCategory:</label>
            <select
              id="serviceCategory"
              name="serviceCategory"
              class="form-control"
              onChange={(e) =>
                setAdd({ ...Add, serviceCategory: e.target.value })
              }
            >
              <option value="TAKE_AWAY_SERVICE">Take Away service</option>
              <option value="CLEANING_SERVICE">cleaning service</option>
              <option value="MAINTENANCE_SERVICE">maintenance service</option>
            </select>
          </div>
        </div>

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

export default AddService;
