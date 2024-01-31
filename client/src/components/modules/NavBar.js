import React from "react";
import { Link } from "@reach/router";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="NavBar-container">
      <Link to="/" className="NavBar-home">
        HOME
      </Link>
      <Link to="/project/" className="NavBar-link">
        PROJECT
      </Link>
      <Link to="/about/" className="NavBar-link">
        ABOUT
      </Link>
      <Link to="/contact/" className="NavBar-link">
        CONTACT
      </Link>
    </nav>
  );
};

export default NavBar;
