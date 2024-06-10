import { useState } from "react";
import "react-phone-number-input/style.css";
import "../css/Update.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../css/Register.css";
function Register() {
  const navigate = useNavigate();
  const [Add, setAdd] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    email: "",
    phoneNumber: "",
    birthday: "",
    gender: "MALE",
    image: "",
    loading: false,
    err: null,
  });
  const Addfun = (e) => {
    e.preventDefault();
    setAdd({ ...Add, loading: true, err: [] });
    axios
      .post(`http://localhost:9090/owners/register-owner`, {
        firstName: Add.firstName,
        lastName: Add.lastName,
        userName: Add.userName,
        email: Add.email,
        phoneNumber: Add.phoneNumber,
        birthday: Add.birthday,
        gender: Add.gender,
        password: Add.password,
        image: Add.image,
      })
      .then((resp) => {
        console.log(Add);
        console.log(resp.data, resp.status);
        setAdd({ ...Add, loading: false, err: [] });
        Swal.fire("Added Successfully!", "", "success").then((e) => {
          navigate(`/login`);
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
      <div className="bgRE"></div>
      <form className="p-3 formRE rounded">
        <div class="form-row row">
          <div class="form-group col-md-6">
            <label for="First-Name">First Name</label>
            <input
              type="text"
              class="form-control"
              id="First-Name"
              placeholder="First Name"
              onChange={(e) => setAdd({ ...Add, firstName: e.target.value })}
            />
          </div>
          <div class="form-group col-md-6">
            <label for="Last-Name">Last Name</label>
            <input
              type="text"
              class="form-control"
              id="Last-Name"
              placeholder="Last Name"
              onChange={(e) => setAdd({ ...Add, lastName: e.target.value })}
            />
          </div>
        </div>
        <div class="form-row row">
          <div class="form-group col-md-6">
            <label for="Username">Username</label>
            <input
              type="text"
              class="form-control"
              id="Username"
              placeholder="Username"
              onChange={(e) => setAdd({ ...Add, userName: e.target.value })}
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputPassword4">Password</label>
            <input
              type="text"
              class="form-control"
              id="inputPassword4"
              placeholder="Password"
              onChange={(e) => setAdd({ ...Add, password: e.target.value })}
            />
          </div>
        </div>
        <div class="form-row row">
          <div class="form-group col-md-6">
            <label for="Email">Email</label>
            <input
              type="Email"
              class="form-control"
              id="email"
              placeholder="email"
              onChange={(e) => setAdd({ ...Add, email: e.target.value })}
            />
          </div>
          <div class="form-group col-md-6">
            <label for="image">image</label>
            <input
              type="file"
              accept="image/*"
              class="form-control"
              id="image"
              placeholder="image"
              onChange={(e) => setAdd({ ...Add, image: e.target.value })}
            />
          </div>
        </div>
        <div className="from-row row">
          <div class="form-group col-md-4">
            <label for="Phone">Phone Number</label>
            <input
              class="form-control"
              type="tel"
              id="phone"
              name="phone"
              placeholder="ex-01012345678"
              pattern="[0]{1}[1]{1}[0-2]{1}[0-9]{8}"
              required
              onChange={(e) => setAdd({ ...Add, phoneNumber: e.target.value })}
            ></input>
          </div>
          <div class="form-group col-md-4">
            <label for="Birth-Day">Birth Day</label>
            <input
              type="date"
              class="form-control"
              id="date"
              timezone="[[timezone]]"
              min="1960-01-01"
              max="2000-12-31"
              onChange={(e) => setAdd({ ...Add, birthday: e.target.value })}
            />
          </div>

          <div class="form-group col-md-4">
            <label for="Gender">Gender</label>
            <select
              id="Gender"
              name="Gender"
              class="form-control"
              onChange={(e) => setAdd({ ...Add, gender: e.target.value })}
            >
              <option value="MALE">male</option>
              <option value="FEMALE">female</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-primary my-2 update-btn mt-4"
          onClick={Addfun}
        >
          Register
        </button>
      </form>
    </>
  );
}

export default Register;
