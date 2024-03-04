import { Link } from "react-router-dom";
import "../css/Logo.css";
import LogoBrand from "../images/logo.png";
function Logo() {
  return (
    <div className="logo-block">
      <Link to="/ELsayes-Front-End" className="logo">
        <img src={LogoBrand} alt="Elite Admin Dashboard" />
      </Link>
    </div>
  );
}
export default Logo;
