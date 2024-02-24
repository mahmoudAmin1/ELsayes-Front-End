import { Link } from "react-router-dom";
import "../css/UserLogin.css";
function UserLogin(props) {
  return (
    <>
      <div className="login-user">
        <a href="/Profile" className="profile-image">
          <img src={props.image} alt="user" id="user-image"></img>
          <span className="profile-name ">Welcome ,{props.name}</span>
        </a>
        <Link to="/login" className="logState">
          {props.state}
        </Link>
      </div>
    </>
  );
}
export default UserLogin;
