import { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "../../css/Update.css";
import axios from "axios";
import Swal from "sweetalert2";
import { getAuthUser, getUserData } from "../../helper/Storage";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
function AddManager() {
  const navigate = useNavigate();
  const logData = getAuthUser();
  const userData = getUserData();
  const [Branches, setBranches] = useState("");
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
    baseSalary: "",
    bonus: "",
    managerPermission: "FIRST_LEVEL",
    ownerId: userData.id,
    branchId: "",
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
  useEffect(() => {
    fetch("http://localhost:9090/owners/get-all-branches", {
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
        setBranches(data);
        const availableBranches = Branches.filter((data) => !data.managerId);
        if (availableBranches.length > 0) {
          setAdd((prevState) => ({
            ...prevState,
            branchId: availableBranches[0].branchId,
          }));
        }
      })
      .catch((error) => {
        console.log("There was a problem with the fetch operation:", error);
      });
  }, []);
  const Addfun = (e) => {
    console.log(logData.username);
    e.preventDefault();
    setAdd({ ...Add, loading: true, err: [] });
    axios
      .post(
        `http://localhost:9090/owners/add-manager`,
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
          baseSalary: Add.baseSalary,
          bonus: Add.bonus,
          managerPermission: Add.managerPermission,
          branchId: Add.branchId,
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
  //   useEffect(() => {
  //     const availableBranches = Branches.filter((data) => !data.managerId);
  //     if (availableBranches.length > 0) {
  //       setAdd({ ...Add, branchId: availableBranches[0].id });
  //     }
  //   }, []);
  if (Branches.length === 0) {
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
          <div className="form-group col-md-6">
            <label for="baseSalary">baseSalary</label>
            <input
              type="number"
              className="form-control"
              id="baseSalary"
              placeholder="base salary"
              onChange={(e) => setAdd({ ...Add, baseSalary: e.target.value })}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="bonus">bonus</label>
            <input
              type="number"
              className="form-control"
              id="bonus"
              placeholder="bonus"
              onChange={(e) => setAdd({ ...Add, bonus: e.target.value })}
            />
          </div>
        </div>
        <div className="from-row row">
          <div className="form-group col-md-6">
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
          <div className="form-group col-md-6">
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
          </div>
        </div>
        <div className="form-row row">
          <div className="form-group col-md-4">
            <label for="managerPermission">manager Permission:</label>
            <select
              id="managerPermission"
              name="managerPermission"
              className="form-control"
              onChange={(e) =>
                setAdd({ ...Add, managerPermission: e.target.value })
              }
            >
              <option value="FIRST_LEVEL">Top Manager</option>
              <option value="SECOND_LEVEL">Manager</option>
            </select>
          </div>
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
          <div className="form-group col-md-4">
            <label for="branchId">branch Name:</label>
            <select
              id="branchId"
              name="branchId"
              className="form-control"
              onChange={(e) => setAdd({ ...Add, branchId: e.target.value })}
            >
              {Branches.filter((data) => !data.managerId).length > 0 ? (
                Branches.filter((data) => !data.managerId).map((data) => (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                ))
              ) : (
                <option disabled>No available branches now</option>
              )}
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

export default AddManager;
