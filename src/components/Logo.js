import "../css/Logo.css";
import LogoBrand from "../images/logo.png";
function Logo() {
  return (
    <div className="logo-block">
      <a href="index.html" className="logo">
        <img src={LogoBrand} alt="Elite Admin Dashboard" />
      </a>
    </div>
  );
}
export default Logo;
