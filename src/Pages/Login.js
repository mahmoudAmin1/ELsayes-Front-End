// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import "../css/Login.css";
// import axios from "axios";
// import React, { useState } from "react";
// import Alert from "react-bootstrap/Alert";
// import { useNavigate } from "react-router-dom";
// import { getAuthUser, setAuthUser } from "../helper/Storage";

// function Login() {
//   const navigate = useNavigate();

//   const [login, setLogin] = useState({
//     userName: "",
//     password: "",
//     loading: false,
//     err: null,
//   });

//   const LoginFun = async (e) => {
//     e.preventDefault();
//     setLogin({ ...login, loading: true, err: [] });

//     try {
//       const resp = await axios.post("http://localhost:9090/auth/login", {
//         userName: login.userName,
//         password: login.password,
//       });

//       setLogin({ ...login, loading: false, err: [] });
//       setAuthUser(resp.data);
//       navigate(`/${getAuthUser().userRole}`);
//     } catch (err) {
//       if (
//         err.response &&
//         (err.response.status === 400 || err.response.status === 422)
//       ) {
//         setLogin({
//           ...login,
//           loading: false,
//           err: err.response.data.message,
//         });
//       } else {
//         setLogin({
//           ...login,
//           loading: false,
//           err: "Something went wrong",
//         });
//       }
//     }
//   };

//   return (
//     <>
//       {login.loading === false && login.err && (
//         <Alert variant="danger" className="alert-login">
//           {login.err}
//         </Alert>
//       )}
//       <div className="bg"></div>
//       <Form
//         className="border rounded-3 m-auto p-5 shadow-lg form"
//         onSubmit={LoginFun}
//       >
//         <Form.Group
//           className="mb-3 w-100 mx-auto mt-3"
//           controlId="formBasicEmail"
//         >
//           <Form.Label>Username</Form.Label>
//           <Form.Control
//             type="text"
//             required
//             placeholder="Enter Username"
//             onChange={(e) => setLogin({ ...login, userName: e.target.value })}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3 w-100 m-auto" controlId="formBasicPassword">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             required
//             placeholder="Password"
//             onChange={(e) => setLogin({ ...login, password: e.target.value })}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3 w-100 m-auto" controlId="formBasicCheckbox">
//           <Form.Check type="checkbox" label="Check me out" />
//         </Form.Group>
//         <Form.Group className="m-auto" controlId="formBasicButton">
//           <Button variant="primary" type="submit" className="w-100">
//             Login
//           </Button>
//           {/* <Button
//             variant="primary"
//             className="w-100"
//             onClick={() => navigate("/Register")}
//           >
//             Register
//           </Button> */}
//         </Form.Group>
//         <Form.Group className="mb-3 w-100 m-auto" controlId="formBasicCheckbox">
//           <Form.Text type="checkbox" label="Check me out" />
//         </Form.Group>
//       </Form>
//     </>
//   );
// }

// export default Login;
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../css/Login.css";
import axios from "axios";
import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { getAuthUser, setAuthUser } from "../helper/Storage";

function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    userName: "",
    password: "",
    loading: false,
    err: null,
  });

  const LoginFun = async (e) => {
    e.preventDefault();
    setLogin({ ...login, loading: true, err: [] });

    try {
      const resp = await axios.post("http://localhost:9090/auth/login", {
        userName: login.userName,
        password: login.password,
      });

      setLogin({ ...login, loading: false, err: [] });
      setAuthUser(resp.data);
      navigate(`/${getAuthUser().userRole}`);
    } catch (err) {
      if (
        err.response &&
        (err.response.status === 400 || err.response.status === 422)
      ) {
        setLogin({
          ...login,
          loading: false,
          err: err.response.data.message,
        });
      } else {
        setLogin({
          ...login,
          loading: false,
          err: "Something went wrong",
        });
      }
    }
  };

  return (
    <>
      {login.loading === false && login.err && (
        <Alert variant="danger" className="alert-login">
          {login.err}
        </Alert>
      )}
      <div className="bg"></div>
      <Form
        className="border rounded-3 m-auto p-5 shadow-lg form"
        onSubmit={LoginFun}
      >
        <Form.Group
          className="mb-3 w-100 mx-auto mt-3"
          controlId="formBasicEmail"
        >
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter Username"
            onChange={(e) => setLogin({ ...login, userName: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 w-100 m-auto" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Password"
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3 w-100 m-auto" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Form.Group className="m-auto" controlId="formBasicButton">
          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default Login;
