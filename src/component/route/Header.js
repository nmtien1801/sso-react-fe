import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {

  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_SSO}?serviceURL=${process.env.REACT_APP_SERVICE_URL}`;
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">MyWebsite</div>
      <ul className="navbar-links">
        <li>
          <Link onClick={()=>handleLogin()}>Login</Link>
        </li>
       
      </ul>
    </nav>
  );
};

export default Header;
