import { Link } from "react-router-dom";
import "../css/UserLogin.css";
import { removeAuthUser, removeUserData, getAuthUser } from "../helper/Storage";
function UserLogin(props) {
  return (
    <>
      <div className="login-user">
        <Link
          to={`/${getAuthUser().userRole}/Profile`}
          className="profile-image"
        >
          <img
            src={`data:image/*;base64,${props.image}`}
            alt="user"
            id="user-image"
          ></img>
          <span className="profile-name ">Welcome ,{props.name}</span>
        </Link>
        <Link
          to="/login"
          className="btn btn-sm btn-danger"
          onClick={() => {
            removeAuthUser();
            removeUserData();
          }}
        >
          Logout
        </Link>
      </div>
    </>
  );
}
export default UserLogin;
