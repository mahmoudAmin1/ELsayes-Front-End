import { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "../../css/Update.css";
import axios from "axios";
import Swal from "sweetalert2";
import { getAuthUser, getUserData } from "../../helper/Storage";
import { useNavigate, useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";
function UpdateOwner() {
  const navigate = useNavigate();
  const logData = getAuthUser();
  let { id } = useParams();
  const [Owner, setOwner] = useState("");
  const [Update, setUpdate] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    email: "",
    phoneNumber: "",
    birthday: "",
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
      setUpdate({ ...Update, image: base64String });
    };

    reader.readAsDataURL(file);
  };
  useEffect(() => {
    fetch(`http://localhost:9090/owners/get-by-id/${id}`, {
      method: "GET",
      headers: {
        Authorization:
          "Basic " + btoa(logData.username + ":" + logData.password),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the data
        setOwner(data);
        setUpdate(data);
      })
      .catch((error) => {
        console.log("There was a problem with the fetch operation:", error);
      });
  }, []);
  const Updatefun = (e) => {
    console.log(logData);
    e.preventDefault();
    setUpdate({ ...Update, loading: true, err: [] });
    axios
      .put(
        `http://localhost:9090/owners/update-owner/${id}`,
        {
          firstName: Update.firstName,
          lastName: Update.lastName,
          userName: Update.userName,
          email: Update.email,
          phoneNumber: Update.phoneNumber,
          birthday: Update.birthday,
          gender: Update.gender,
          image: Update.image,
          password: Update.password,
          oldOwnerId: logData.id,
        },
        {
          headers: {
            Authorization:
              "Basic " + btoa(logData.username + ":" + logData.password),
          },
        }
      )
      .then((resp) => {
        console.log(Update);
        console.log(resp.data, resp.status);
        setUpdate({ ...Update, loading: false, err: [] });
        Swal.fire("Updateed Successfully!", "", "success").then((e) => {
          navigate(`/${logData.userRole}`);
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
  if (Owner.length === 0) {
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

          {Update.image !== Owner.image && (
            <button
              class="custom-file-upload btn btn-danger"
              onClick={(e) => {
                e.preventDefault();
                setUpdate({ ...Update, image: Owner.image });
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
              defaultValue={Owner.firstName}
              placeholder="First Name"
              onChange={(e) =>
                setUpdate({ ...Update, firstName: e.target.value })
              }
            />
          </div>
          <div className="form-group col-md-6">
            <label for="Last-Name">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="Last-Name"
              defaultValue={Owner.lastName}
              placeholder="Last Name"
              onChange={(e) =>
                setUpdate({ ...Update, lastName: e.target.value })
              }
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
              defaultValue={Owner.email}
              placeholder="email"
              onChange={(e) => setUpdate({ ...Update, email: e.target.value })}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="inputPassword4">Password</label>
            <input
              type="text"
              className="form-control"
              id="inputPassword4"
              defaultValue={Owner.password}
              placeholder="Password"
              onChange={(e) =>
                setUpdate({ ...Update, password: e.target.value })
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
              defaultValue={Owner.phoneNumber}
              placeholder="ex-01012345678"
              pattern="[0]{1}[1]{1}[0-2]{1}[0-9]{8}"
              required
              onChange={(e) =>
                setUpdate({ ...Update, phoneNumber: e.target.value })
              }
            ></input>
          </div>

          <div className="form-group col-md-4">
            <label for="Birth-Day">Birth Day</label>
            <input
              type="date"
              className="form-control"
              id="date"
              defaultValue={Owner.birthday}
              timezone="[[timezone]]"
              min="1960-01-01"
              max="2000-12-31"
              onChange={(e) =>
                setUpdate({ ...Update, birthday: e.target.value })
              }
            />
          </div>

          <div className="form-group col-md-4">
            <label for="Gender">Gender</label>
            <select
              id="Gender"
              name="Gender"
              defaultValue={Owner.gender}
              className="form-control"
              onChange={(e) => setUpdate({ ...Update, gender: e.target.value })}
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

export default UpdateOwner;
