import React, { useRef, useEffect } from "react";
import { drawCanvas } from "../../../canvasManager";
import { Graph } from "../../graph/Graph";

import "./Visualiser.css";

const MAX_WIDTH = window.innerWidth;
const MAX_HEIGHT = window.innerHeight;

const Visualiser = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const graph = new Graph(MAX_WIDTH, MAX_HEIGHT, 20);
    graph.gen_random(16);
    drawCanvas(canvasRef, graph);
  }, []);

  const regenerateButton = (
    <button
      onClick={() => {
        console.log("Regenerating");
      }}
    >
      Regenerate Graph
    </button>
  );

  const verifyButton = (
    <button
      onClick={() => {
        console.log("Verifying");
      }}
    >
      Verify Your Solution
    </button>
  );

  const solveButton = (
    <button
      onClick={() => {
        console.log("Solving");
      }}
    >
      Show Solution
    </button>
  );

  const difficultySelect = (
    <select id="Visual-select">
      <option value="">Easy</option>
      <option value="dog">Normal</option>
      <option value="cat">Hard</option>
    </select>
  );

  return (
    <>
      <div className="Visual-menu">
        <div className="Visual-title u-bold">
          Maximise Profit For Resturant Chain (Work In Progress)
        </div>
        {regenerateButton}
        {verifyButton}
        {solveButton}
        {difficultySelect}
      </div>
      <canvas ref={canvasRef} width={MAX_WIDTH} height={window.innerHeight} />
    </>
  );
};

export default Visualiser;
