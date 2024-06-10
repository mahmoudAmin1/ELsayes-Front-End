import { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "../../css/Update.css";
import axios from "axios";
import Swal from "sweetalert2";
import { getAuthUser, getUserData } from "../../helper/Storage";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
function AddOwner() {
  const navigate = useNavigate();
  const logData = getAuthUser();
  const [Add, setAdd] = useState({
    FirstName: "",
    LastName: "",
    username: "",
    password: "",
    Email: "",
    PhoneNumber: "",
    BirthDay: "",
    gender: "MALE",
    image: "",
    oldOwnerId: logData.id,
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
    console.log(logData.username);
    e.preventDefault();
    setAdd({ ...Add, loading: true, err: [] });
    axios
      .post(
        `http://localhost:9090/owners/add-owner`,
        {
          firstName: Add.FirstName,
          lastName: Add.LastName,
          userName: Add.username,
          email: Add.Email,
          phoneNumber: Add.PhoneNumber,
          birthday: Add.BirthDay,
          gender: Add.gender,
          image: Add.image,
          password: Add.password,
          oldOwnerId: Add.oldOwnerId,
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
        console.log(resp.data, resp.status);
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
            <label for="First-Name">First Name</label>
            <input
              type="text"
              className="form-control"
              id="First-Name"
              placeholder="First Name"
              onChange={(e) => setAdd({ ...Add, FirstName: e.target.value })}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="Last-Name">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="Last-Name"
              placeholder="Last Name"
              onChange={(e) => setAdd({ ...Add, LastName: e.target.value })}
            />
          </div>
        </div>
        <div className="form-row row">
          <div className="form-group col-md-6">
            <label for="Username">Username</label>
            <input
              type="text"
              className="form-control"
              id="Username"
              placeholder="Username"
              onChange={(e) => setAdd({ ...Add, username: e.target.value })}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="inputPassword4">Password</label>
            <input
              type="text"
              className="form-control"
              id="inputPassword4"
              placeholder="Password"
              onChange={(e) => setAdd({ ...Add, password: e.target.value })}
            />
          </div>
        </div>
        <div className="form-row row">
          <div className="form-group col-md-6">
            <label for="Email">Email</label>
            <input
              type="Email"
              className="form-control"
              id="email"
              placeholder="email"
              onChange={(e) => setAdd({ ...Add, Email: e.target.value })}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="image">image</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              id="image"
              placeholder="image"
              onChange={(e) => handleImageUpload(e)}
            />
          </div>
        </div>
        <div className="from-row row">
          <div className="form-group col-md-4">
            <label for="Phone">Phone Number</label>
            <input
              className="form-control"
              type="tel"
              id="phone"
              name="phone"
              placeholder="ex-01012345678"
              pattern="[0]{1}[1]{1}[0-2]{1}[0-9]{8}"
              required
              onChange={(e) => setAdd({ ...Add, PhoneNumber: e.target.value })}
            ></input>
          </div>
          <div className="form-group col-md-4">
            <label for="Birth-Day">Birth Day</label>
            <input
              type="date"
              className="form-control"
              id="date"
              timezone="[[timezone]]"
              min="1960-01-01"
              max="2000-12-31"
              onChange={(e) => setAdd({ ...Add, BirthDay: e.target.value })}
            />
          </div>{" "}
          <div className="form-group col-md-4">
            <label for="Gender">Gender</label>
            <select
              id="Gender"
              name="Gender"
              className="form-control"
              onChange={(e) => setAdd({ ...Add, gender: e.target.value })}
            >
              <option value="MALE">male</option>
              <option value="FEMALE">female</option>
            </select>
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

export default AddOwner;
