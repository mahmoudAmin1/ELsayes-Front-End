import { useState, useEffect } from "react";
import "../../css/Update.css";
import axios from "axios";
import Swal from "sweetalert2";
import { getAuthUser } from "../../helper/Storage";
import { useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";
function AddPackageToBranch() {
  const [branches, setBranches] = useState([]);
  const [Selected, setSelected] = useState("");
  const [Package, setPackage] = useState([]);
  const logData = getAuthUser();
  let { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:9090/owners/get-all-branches",
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
        setBranches(data);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    fetch(`http://localhost:9090/managers/get-package-by-id/${id}`, {
      method: "GET",
      headers: {
        Authorization:
          "Basic " + btoa(logData.username + ":" + logData.password),
      },
    })
      .then((res) => res.json())
      .then((data) => setPackage(data));
  }, []);

  const AddPackage = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post(
        "http://localhost:9090/managers/add-package-to-branch",
        {
          packageId: id,
          branchId: Selected, // Corrected usage of getUserData
        },
        {
          headers: {
            Authorization:
              "Basic " + btoa(logData.username + ":" + logData.password),
          },
        }
      );
      Swal.fire({
        confirmButtonText: "ok",
        icon: "success",
        text: "Added Successfully!",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.response.data.message}`,
      });
    }
  };
  useEffect(() => {
    // Set the selected branch ID when branches change
    if (branches.length > 0) {
      setSelected(branches[0].id);
    }
  });
  if (branches.length === 0) {
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
            <label htmlFor="percentageOfDiscount">Package name</label>
            <input
              type="text"
              className="form-control"
              id="packageName"
              value={Package.name}
              readOnly
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="branch">branch</label>
            <select
              id="branch"
              name="branch"
              className="form-control"
              onChange={(e) => setSelected(e.target.value)}
            >
              {branches.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary my-2 update-btn mt-4"
          onClick={AddPackage}
        >
          Add
        </button>
      </form>
    </>
  );
}

export default AddPackageToBranch;
