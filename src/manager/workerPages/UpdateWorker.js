import { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import "../../css/Update.css";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import Swal from "sweetalert2";
import { getAuthUser, getUserData } from "../../helper/Storage";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/UpdateWorker.css";
function UpdateWorker() {
  const navigate = useNavigate();
  let { id } = useParams();
  const logData = getAuthUser();
  const userData = getUserData();
  const [User, setUser] = useState([]);
  const [Update, setUpdate] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    phoneNumber: "",
    birthday: "",
    gender: "",
    image: "",
    baseSalary: "",
    bonus: "",
    workerRole: "",
    branchId: userData.branchId,
    loading: false,
    err: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:9090/managers/get-worker-by-id/${id}`,
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
        setUser(data);
        setUpdate(data);
      } catch (error) {
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
      setUpdate({ ...Update, image: base64String });
    };

    reader.readAsDataURL(file);
  };
  if (User.length === 0) {
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
  const Updatefun = (e) => {
    e.preventDefault();
    setUpdate({ ...Update, loading: true, err: [] });
    axios
      .put(
        `http://localhost:9090/managers/update-worker/${id}`,
        {
          firstName: Update.firstName,
          lastName: Update.lastName,
          userName: User.userName,
          email: Update.email,
          phoneNumber: Update.phoneNumber,
          birthday: Update.birthday,
          gender: Update.gender,
          image: Update.image,
          password: Update.password,
          baseSalary: Update.baseSalary,
          bonus: Update.bonus,
          workerRole: Update.workerRole,
          branchId: User.branchId,
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

          {Update.image !== User.image && (
            <button
              class="custom-file-upload btn btn-danger"
              onClick={(e) => {
                e.preventDefault();
                setUpdate({ ...Update, image: User.image });
              }}
            >
              Cancel
            </button>
          )}
        </div>

        <div class="form-row row">
          <div class="form-group col-md-6">
            <label for="First-Name">First Name</label>
            <input
              type="text"
              class="form-control"
              id="First-Name"
              placeholder="First Name"
              defaultValue={User.firstName}
              onChange={(e) =>
                setUpdate({ ...Update, firstName: e.target.value })
              }
            />
          </div>
          <div class="form-group col-md-6">
            <label for="Last-Name">Last Name</label>
            <input
              type="text"
              class="form-control"
              id="Last-Name"
              placeholder="Last Name"
              defaultValue={User.lastName}
              onChange={(e) =>
                setUpdate({ ...Update, lastName: e.target.value })
              }
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
              defaultValue={User.email}
              placeholder="email"
              onChange={(e) => setUpdate({ ...Update, email: e.target.value })}
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputPassword4">Password</label>
            <input
              type="text"
              class="form-control"
              id="inputPassword4"
              defaultValue={User.password}
              placeholder="Password"
              onChange={(e) =>
                setUpdate({ ...Update, password: e.target.value })
              }
            />
          </div>
        </div>
        <div class="form-row row">
          <div class="form-group col-md-6">
            <label for="Phone">Phone Number</label>
            <input
              class="form-control"
              type="tel"
              id="phone"
              name="phone"
              defaultValue={User.phoneNumber}
              placeholder="ex-01012345678"
              pattern="[0]{1}[1]{1}[0-2,5]{1}[0-9]{8}"
              required
              onChange={(e) =>
                setUpdate({ ...Update, phoneNumber: e.target.value })
              }
            ></input>
          </div>
          <div class="form-group col-md-6">
            <label for="Birth-Day">Birth Day</label>
            <input
              type="date"
              class="form-control"
              id="date"
              timezone="[[timezone]]"
              min="1960-01-01"
              max="2000-12-31"
              defaultValue={User.birthday}
              onChange={(e) =>
                setUpdate({ ...Update, birthday: e.target.value })
              }
            />
          </div>
        </div>
        <div className="from-row row">
          <div class="form-group col-md-6">
            <label for="baseSalary">baseSalary</label>
            <input
              type="number"
              class="form-control"
              id="baseSalary"
              defaultValue={User.baseSalary}
              placeholder="base salary"
              onChange={(e) =>
                setUpdate({ ...Update, baseSalary: e.target.value })
              }
            />
          </div>
          <div class="form-group col-md-6">
            <label for="bonus">bonus</label>
            <input
              type="number"
              class="form-control"
              id="bonus"
              defaultValue={User.bonus}
              placeholder="bonus"
              onChange={(e) => setUpdate({ ...Update, bonus: e.target.value })}
            />
          </div>
        </div>
        <div className="from-row row"></div>
        <div class="form-row row">
          <div class="form-group col-md-6">
            <label for="workerRole">workerRole:</label>
            <select
              id="workerRole"
              name="workerRole"
              class="form-control"
              defaultValue={User.workerRole}
              onChange={(e) =>
                setUpdate({ ...Update, workerRole: e.target.value })
              }
            >
              <option value="PARKING_WORKER">ParkingWorker</option>
              <option value="CLEANING_WORKER">CleaningWorker</option>
              <option value="MAINTENANCE_WORKER">MaintenanceWorker</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label for="Gender">Gender</label>
            <select
              id="Gender"
              name="Gender"
              class="form-control"
              defaultValue={User.gender}
              onChange={(e) => setUpdate({ ...Update, gender: e.target.value })}
            >
              <option value="MALE">male</option>
              <option value="FEMALE">female</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-primary my-2 update-btn mt-4"
          onClick={Updatefun}
        >
          Update
        </button>
      </form>
    </>
  );
}

export default UpdateWorker;
