import React, { useRef, useEffect, useState } from "react";
import { drawCanvas } from "../../../canvasManager";
import { Graph } from "../../graph/graph";
import { MinimumSpanningTree } from "../../graph/mst";

import "./Visualiser.css";

const MAX_WIDTH = window.innerWidth;
const MAX_HEIGHT = window.innerHeight;
const VERTEX_RADIUS = 20;
const DIFFICULTY_DICT = { easy: 4, normal: 8, hard: 16 };

const Visualiser = (props) => {
  const canvasRef = useRef(null);
  const [difficulty, setDifficulty] = useState(DIFFICULTY_DICT.easy);
  const [graph, setGraph] = useState(null);

  useEffect(() => {
    newGraph(difficulty);
  }, [difficulty]);

  useEffect(() => {
    if (graph && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, MAX_WIDTH, window.innerHeight);
      drawCanvas(canvasRef, graph);
    }
  }, [graph]);

  const newGraph = (difficulty) => {
    let new_graph = new Graph(MAX_WIDTH, MAX_HEIGHT, VERTEX_RADIUS);
    new_graph.gen_random(difficulty);
    let mst = new MinimumSpanningTree(new_graph);
    mst.gen_edges();
    setGraph(new_graph);
  };

  const regenerateButton = (
    <button
      onClick={() => {
        newGraph(difficulty);
      }}
    >
      Regenerate Graph
    </button>
  );

  const verifyButton = (
    <button
      onClick={() => {
        // TODO
        console.log("Verifying");
      }}
    >
      Verify Your Solution
    </button>
  );

  const solveButton = (
    <button
      // TODO
      onClick={() => {
        console.log("Solving");
      }}
    >
      Show Solution
    </button>
  );

  const difficultySelect = (
    <select
      id="Visual-select"
      onChange={(event) => {
        setDifficulty(event.target.value);
      }}
    >
      <option value={DIFFICULTY_DICT.easy}>Easy</option>
      <option value={DIFFICULTY_DICT.normal}>Normal</option>
      <option value={DIFFICULTY_DICT.hard}>Hard</option>
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
