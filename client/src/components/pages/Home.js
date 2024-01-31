import React from "react";
import { Link } from "@reach/router";
import "./Home.css";

const Home = () => {
  return (
    <div className="Home-container">
      <div className="Home-intro u-bold">
        I'm Terry. This is my Experimental Website
      </div>
      <div className="Home-body">
        Built with React + NodeJS +MongoDB from scratch.
      </div>
      <Link to="about" className="Home-button u-bold">
        MORE INFORMATION
      </Link>
    </div>
  );
};

export default Home;
