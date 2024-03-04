import { Link } from "react-router-dom";
import "../css/UserLogin.css";
function UserLogin(props) {
  return (
    <>
      <div className="login-user">
        <Link to="/Profile" className="profile-image">
          <img src={props.image} alt="user" id="user-image"></img>
          <span className="profile-name ">Welcome ,{props.name}</span>
        </Link>
        <Link to="/login" className="btn btn-sm btn-danger">
          Logout
        </Link>
      </div>
    </>
  );
}
export default UserLogin;
