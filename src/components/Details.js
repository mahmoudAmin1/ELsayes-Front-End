import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
function Details(props) {
  const users_api = props.link;
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch(users_api)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);
  delete user.address;
  delete user.name;
  if (user.length === 0) {
    return <h1> loading </h1>;
  }

  let entries = Object.entries(user);
  const Data = () => {
    return (
      <Form
        className="text-center m-auto pt-5 border border-3 border-danger rounded border-opacity-50"
        style={{ width: "50%" }}
      >
        {entries.map(([key, val]) => {
          return (
            <Form.Group
              as={Row}
              controlId={`formPlaintext${key}`}
              key={key}
              className="m-auto"
              xs="auto"
            >
              <Col>
                <Form.Label column>{key} :</Form.Label>
              </Col>
              <Col>
                <Form.Control plaintext readOnly defaultValue={val} />
              </Col>
            </Form.Group>
          );
        })}
        <Button className="mx-auto p-2 my-5" variant="outline-danger">
          Delete
        </Button>
      </Form>
    );
  };

  return <>{Data()}</>;
}

export default Details;
