import React from "react";
import mycat from "../../public/mycat.png";

import "./About.css";
import { Link } from "@reach/router";

const About = () => {
  return (
    <div className="u-container">
      <div className="u-title">About</div>
      <div className="About-content">
        <img className="About-avatar fade-in-delayed" src={mycat} />
        <div className="About-texts fade-in-delayed">
          <p className="About-intro u-bold">
            Hey There, I'm Terry. I graduate with a degree in Information
            Technology from the Australian National University. I'm passionate
            about automation through algorithms and AI.
          </p>
          <p>
            Why spend 3 minutes manually doing things when you could spend 3
            hours failing at automating it! right...?
          </p>
          <p className="About-project">
            <span>You can go checkout some of my personal projects on </span>
            <Link to="/project" className="u-bold About-link">
              Project page
            </Link>
          </p>
          <div className="About-whisper">
            *Cough* Code might not always be clean *Cough*
          </div>
          <div className="About-whisper">
            **Cough** If there is any clean code **Cough**
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
