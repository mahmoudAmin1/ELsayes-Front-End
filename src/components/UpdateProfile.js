import { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import "../css/Update.css";
import axios from "axios";
import Swal from "sweetalert2";
import { getAuthUser, getUserData, setUserData } from "../helper/Storage";
import { useNavigate } from "react-router-dom";
function UpdateProfile() {
  const navigate = useNavigate();
  let userData = getUserData();
  let apiLink, getLink;
  const logData = getAuthUser();
  if (logData.userRole === "OWNER") {
    apiLink = `http://localhost:9090/owners/edit-profile/${userData.id}`;
    getLink = `http://localhost:9090/owners/get-by-id/${userData.id}`;
  } else {
    apiLink = `http://localhost:9090/managers/edit-profile/${userData.id}`;
    getLink = `http://localhost:9090/managers/get-manager-by-id/${userData.id}`;
  }
  const [update, setUpdate] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    password: userData.password,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
    birthday: userData.birthday,
    gender: userData.gender,
    image: userData.image,
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
      setUpdate({ ...update, image: base64String });
    };
    reader.readAsDataURL(file);
  };
  const Updatefun = (e) => {
    e.preventDefault();
    setUpdate({ ...update, loading: true, err: [] });
    axios
      .put(
        apiLink,
        {
          firstName: update.firstName,
          lastName: update.lastName,
          email: update.email,
          phoneNumber: update.phoneNumber,
          birthday: update.birthday,
          gender: update.gender,
          userName: userData.userName,
          image: update.image,
          password: update.password,
        },
        {
          headers: {
            Authorization:
              "Basic " + btoa(logData.username + ":" + logData.password),
          },
        }
      )
      .then((resp) => {
        console.log(resp.data);
        setUpdate({ ...update, loading: false, err: [] });
        Swal.fire("Updated Successfully!", "", "success").then((e) => {
          navigate(`/${logData.userRole}`);
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400 || err.response.status === 422) {
          setUpdate({
            ...update,
            loading: false,
            err: err.response.data.message,
          });
        } else {
          setUpdate({
            ...update,
            loading: false,
            err: "Something went wrong",
          });
        }
      });
  };
  useEffect(() => {
    const User = async () => {
      try {
        const response = await fetch(getLink, {
          method: "GET",
          headers: {
            Authorization:
              "Basic " + btoa(logData.username + ":" + logData.password),
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.log("There was a problem with the fetch operation:", error);
      }
    };

    User();
  }, [getLink, logData]);
  return (
    <>
      <form className="p-2">
        <div class="text-center">
          <img
            src={`data:image/*;base64,${update.image}`}
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

          {userData.image !== update.image && (
            <button
              class="custom-file-upload btn btn-danger"
              onClick={(e) => {
                e.preventDefault();
                setUpdate({ ...update, image: userData.image });
              }}
            >
              Cancel
            </button>
          )}
        </div>
        <div className="form-row row">
          <div className="form-group col-md-6">
            <label for="First-Name">First Name</label>
            <input
              type="text"
              className="form-control"
              id="First-Name"
              placeholder="First Name"
              defaultValue={userData.firstName}
              onChange={(e) =>
                setUpdate({ ...update, firstName: e.target.value })
              }
            />
          </div>
          <div className="form-group col-md-6">
            <label for="Last-Name">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="Last-Name"
              placeholder="Last Name"
              defaultValue={userData.lastName}
              onChange={(e) => setUpdate({ ...update, lastName: e.value })}
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
              defaultValue={userData.email}
              onChange={(e) => setUpdate({ ...update, email: e.target.value })}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="inputPassword4">Password</label>
            <input
              type="text"
              className="form-control"
              id="inputPassword4"
              placeholder="Password"
              defaultValue={userData.password}
              onChange={(e) =>
                setUpdate({ ...update, password: e.target.value })
              }
            />
          </div>
        </div>

        <div className="form-row row">
          <div className="form-group col-md-4">
            <label for="Phone">Phone Number</label>
            <input
              className="form-control"
              type="tel"
              id="phone"
              name="phone"
              placeholder="ex-01012345678"
              defaultValue={userData.phoneNumber}
              pattern="[0]{1}[1]{1}[0-2]{1}[0-9]{8}"
              required
              onChange={(e) =>
                setUpdate({ ...update, phoneNumber: e.target.value })
              }
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
              defaultValue={userData.birthday}
              onChange={(e) =>
                setUpdate({ ...update, birthday: e.target.value })
              }
            />
          </div>
          <div className="form-group col-md-4">
            <label for="Gender">Gender</label>
            <select
              id="Gender"
              name="Gender"
              className="form-control"
              defaultValue={userData.gender}
              onChange={(e) => setUpdate({ ...update, gender: e.target.value })}
            >
              <option value="MALE">male</option>
              <option value="FEMALE">female</option>
            </select>
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

export default UpdateProfile;
