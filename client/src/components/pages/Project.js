import React, { useState, useEffect } from "react";
import Card from "../modules/Card.js";
import { get } from "../../utilities";

import project_bdnn from "../../public/project_bdnn.png";
import project_excel from "../../public/project_excel.png";
import project_maple from "../../public/project_maple.png";
import project_website from "../../public/project_website.png";

import "./Project.css";

// a bit hard coded by now, migrate to database using GridFS when have time
const projectScreenshots = {
  "Maplestory & Discord Bot": project_maple,
  "Bidrectional Neural Network": project_bdnn,
  "Excel Parser": project_excel,
  "Fullstack Website": project_website,
};

const Project = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    document.title = "Personal Project";
    get("/api/project").then((projectObjs) => {
      setProjects(projectObjs);
    });
  }, []);

  const hasProjects = projects.length !== 0;
  let projectsList = null;

  if (hasProjects) {
    projectsList = projects.map((projectObj) => (
      <div className="Project-card">
        <Card
          key={`Card_${projectObj._id}`}
          _id={projectObj._id}
          project_name={projectObj.project_name}
          project_description={projectObj.project_description}
          project_url={projectObj.project_url}
          screenshot={projectScreenshots[projectObj.project_name]}
        ></Card>
      </div>
    ));
  } else {
    projectsList = <div className="Loading">Loading Project...</div>;
  }

  return (
    <div className="Project-container">
      <div className="u-title">Project</div>
      <div className="Project-cards">{projectsList}</div>
    </div>
  );
};

export default Project;
