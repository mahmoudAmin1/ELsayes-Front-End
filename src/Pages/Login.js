import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
function Login() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg"></div>
      <Form className="border rounded-3 m-auto p-3 shadow-lg form">
        <Form.Group
          className="mb-3 w-100 mx-auto mt-3"
          controlId="formBasicEmail"
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3 w-100 m-auto" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3 w-100 m-auto" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Form.Group className="m-auto" controlId="formBasicButton">
          <Button
            variant="primary"
            type="submit"
            className="w-100"
            onClick={() => navigate("/ELsayes-Front-End")}
          >
            Login
          </Button>
        </Form.Group>
        <Form.Group className="mb-3 w-100 m-auto" controlId="formBasicCheckbox">
          <Form.Text type="checkbox" label="Check me out" />
        </Form.Group>
      </Form>
    </>
  );
}

export default Login;
