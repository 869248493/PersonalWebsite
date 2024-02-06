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
  const [clickedVertex, setClickedVertex] = useState(null);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  // TODO: ? implement if there are more things to click
  //   let clickableObjects = { vertices: [] };
  useEffect(() => {
    newGraph(difficulty);
  }, [difficulty]);

  useEffect(() => {
    if (graph && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, MAX_WIDTH, window.innerHeight);
      drawCanvas(canvasRef, graph);
      canvasRef.current.addEventListener("click", handleCanvasClick);
      canvasRef.current.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("click", handleCanvasClick);
        canvasRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [graph]);

  /**
   * helper func
   */
  const newGraph = (difficulty) => {
    let new_graph = new Graph(MAX_WIDTH, MAX_HEIGHT, VERTEX_RADIUS);
    new_graph.gen_random(difficulty);
    let mst = new MinimumSpanningTree(new_graph);
    mst.gen_edges();
    setGraph(new_graph);
  };

  const handleCanvasClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    let found_clickable = false;
    // Iterate through the graph nodes and check if the click point is within the
    for (let vertex of graph.vertices) {
      const dx = x - vertex.x;
      const dy = y - vertex.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance <= VERTEX_RADIUS) {
        console.log(vertex.id);
        found_clickable = true;
        setClickedVertex(vertex);
      }
    }
    if (!found_clickable) {
      setClickedVertex(null);
    }
  };
  const handleMouseMove = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setIsHoveringClickable(
      graph.vertices.some((vertex) => {
        const pos = vertex.get_pos();
        const dx = x - pos.x;
        const dy = y - pos.y;
        return Math.sqrt(dx * dx + dy * dy) <= VERTEX_RADIUS;
      })
    );
  };

  /**
   * jsx
   */
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
      <canvas
        ref={canvasRef}
        width={MAX_WIDTH}
        height={MAX_HEIGHT}
        style={{ cursor: isHoveringClickable ? "pointer" : "default" }}
      />
      {clickedVertex && (
        <div
          className="menu-window"
          style={{
            position: "absolute",
            top: clickedVertex.get_y() + 20,
            left: clickedVertex.get_x(),
          }}
        >
          <h3>Location Information</h3>
          <p>ID: {clickedVertex.id}</p>
        </div>
      )}
    </>
  );
};

export default Visualiser;
