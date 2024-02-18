import "../css/UserLogin.css";
function UserLogin(props) {
  return (
    <>
      <div className="login-user">
        <a href="/" className="profile-image">
          <img src={props.image} alt="user" id="user-image"></img>
          <span className="profile-name ">Welcome ,{props.name}</span>
        </a>
        <a href="/" className="logState">
          {props.state}
        </a>
      </div>
    </>
  );
}
export default UserLogin;
