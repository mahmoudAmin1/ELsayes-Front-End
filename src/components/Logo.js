import { Link } from "react-router-dom";
import "../css/Logo.css";
import { getAuthUser } from "../helper/Storage";
import logo from "../images/logo.png";
function Logo() {
  return (
    <div className="logo-block">
      <Link
        to={`/${getAuthUser().userRole}/ELsayes-Front-End`}
        className="logo"
      >
        {/* <span className="logo_text">El Sayes</span> */}
        <img src={logo} alt="error" height={60} />
      </Link>
    </div>
  );
}
export default Logo;
