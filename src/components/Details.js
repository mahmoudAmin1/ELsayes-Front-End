import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../css/Details.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { getAuthUser } from "../helper/Storage";

function Details(props) {
  const userdata = getAuthUser();
  const navigate = useNavigate();
  const user_api = props.link;
  const user_delete = props.DeleteLink;
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch(user_api, {
      method: "GET",
      headers: {
        Authorization:
          "Basic " + btoa(userdata.username + ":" + userdata.password),
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);
  if (user.length === 0) {
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
  const Delete = async () => {
    try {
      const response = await fetch(user_delete, {
        method: "DELETE",
        headers: {
          Authorization:
            "Basic " + btoa(userdata.username + ":" + userdata.password),
        },
      });

      const result = await response.json();
      console.log(response.status);
      console.log(result); // Log the result to see the response body
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  let entries = Object.entries(user);
  const Sureness = async () => {
    const result = await Swal.fire({
      title: `Are You Sure You Want To Delete ${user.userName || user.name}?`,
      showDenyButton: true,
      confirmButtonText: "Yes",
    });

    if (result.isConfirmed) {
      await Delete();
      await Swal.fire("Deleted Successfully!", "", "success");
      navigate(`/${userdata.userRole}`);
    }
  };
  const Data = () => {
    return (
      <Form
        className="text-center mx-auto pt-5 border border-3 border-danger rounded border-opacity-30"
        style={{ width: "50%", marginTop: "1%" }}
      >
        {entries.map(([key, val]) => {
          return (
            <Form.Group
              as={Row}
              controlId={`formPlaintext${key}`}
              key={key}
              className="m-auto border-bottom border-opacity-30"
              xs="auto"
              style={{ width: "100%" }}
            >
              <Col className="col">
                <Form.Label column>{key} :</Form.Label>
              </Col>
              {key === "image" ? (
                <Col className="col m-0">
                  {/* <Form.Control plaintext readOnly defaultValue={val} /> */}
                  <img
                    className="rounded-circle border border-dark"
                    src={`data:image/*;base64,${val}`}
                    alt="error"
                    width={48}
                    height={48}
                  />
                </Col>
              ) : (
                <Col className="col m-0">
                  <Form.Control plaintext readOnly defaultValue={val} />
                </Col>
              )}
            </Form.Group>
          );
        })}
        <Button
          className="mx-auto p-2 my-5"
          variant="outline-danger"
          onClick={() => Sureness()}
        >
          Delete
        </Button>
      </Form>
    );
  };

  return <>{Data()}</>;
}

export default Details;
