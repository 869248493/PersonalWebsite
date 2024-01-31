import React from "react";
import { Router } from "@reach/router";
import NavBar from "./modules/NavBar.js";
import Home from "./pages/Home.js";
import Project from "./pages/Project.js";
import Contact from "./pages/Contact.js";
import About from "./pages/About.js";
import NotFound from "./pages/NotFound.js";

import "../utilities.css";
import "./App.css";

const App = () => {
  return (
    <div className="App-container">
      <NavBar />
      <Router>
        <Home path="/" />
        <Project path="project" />
        <About path="about" />
        <Contact path="contact" />
        <NotFound default />
      </Router>
    </div>
  );
};

export default App;
