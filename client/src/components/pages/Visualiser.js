import React, { useRef, useEffect, useState } from "react";
import { drawCanvas } from "../../../canvasManager";
import { Graph } from "../../graph/graph";
import { MinimumSpanningTree } from "../../graph/mst";

import "./Visualiser.css";

const MAX_WIDTH = window.innerWidth;
const MAX_HEIGHT = window.innerHeight;
const VERTEX_RADIUS = 20;
const DISPLAY_DY = 20;
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
      // draw canvas upon mount
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, MAX_WIDTH, window.innerHeight);
      drawCanvas(canvasRef, graph);
      // add listeners for interactability
      canvasRef.current.addEventListener("click", handleCanvasClick);
      canvasRef.current.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      // teardown
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

  const isInCircleRange = (x, y, target_x, target_y, radius) => {
    let dx = x - target_x;
    let dy = y - target_y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= radius ? true : false;
  };

  const findMousePos = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return { x: x, y: y };
  };

  /**
   *  handle user input
   */

  const handleCanvasClick = (event) => {
    const { x, y } = findMousePos(event);
    const clickedVertex = graph.vertices.find((vertex) => {
      const { x: v_x, y: v_y } = vertex.get_pos();
      return isInCircleRange(x, y, v_x, v_y, VERTEX_RADIUS);
    });

    setClickedVertex(clickedVertex);
  };

  const handleMouseMove = (event) => {
    const { x, y } = findMousePos(event);
    setIsHoveringClickable(
      graph.vertices.some((vertex) => {
        const { x: v_x, y: v_y } = vertex.get_pos();
        return isInCircleRange(x, y, v_x, v_y, VERTEX_RADIUS);
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
  /**
   * return
   */
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
          className="display-window"
          style={{
            position: "absolute",
            top: clickedVertex.get_y() + DISPLAY_DY,
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
