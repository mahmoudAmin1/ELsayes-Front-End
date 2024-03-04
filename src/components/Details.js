import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../css/Details.css";
import Swal from "sweetalert2";
import { Oval } from "react-loader-spinner";
function Details(props) {
  const Sureness = () => {
    Swal.fire({
      title: `Are You Sure You Want To Delete ${user_api.name}`,
      showDenyButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Delete();
        Swal.fire("Deleted Successfully!", "", "success");
      }
    });
  };

  const user_api = props.link;
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch(user_api)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);
  delete user.address;
  delete user.name;
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
  const Delete = () => {
    fetch(user_api, { method: "DELETE" }).then((res) => {
      res.json();
      console.log(res.status);
    });
  };

  let entries = Object.entries(user);
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
              <Col className="col m-0">
                <Form.Control plaintext readOnly defaultValue={val} />
              </Col>
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
