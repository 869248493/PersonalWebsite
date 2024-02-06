let canvas;
let VERTEX_COLOR = "";

const convertCoord = (x, y) => {
  if (!canvas) return;
  return {
    drawX: x,
    drawY: canvas.height - y,
  };
};

const fillCircle = (context, x, y, radius, color) => {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
};

const drawCircle = (context, x, y, radius, color = "blue") => {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.strokeStyle = color;
  context.stroke();
  // context.fillStyle = color;
  // context.fill();
};

const drawGraph = (context, graph) => {
  let graph_dict = graph.get_graph();
  graph_dict.vertices.forEach((vertex) => {
    drawCircle(context, vertex.x, vertex.y, vertex.radius);
  });

  graph_dict.edges.forEach((edge) => {
    const v_source = edge.get_source();
    const v_destination = edge.get_destination();
    let res = getLineEndpoints(
      v_source.x,
      v_source.y,
      v_source.radius,
      v_destination.x,
      v_destination.y,
      v_destination.radius
    );

    context.beginPath();
    context.moveTo(res.endpoint1.x, res.endpoint1.y);
    context.lineTo(res.endpoint2.x, res.endpoint2.y);
    context.stroke();
  });
  //   const v_t = graph_dict.vertices[0];
  //   const v_t_2 = graph_dict.vertices[1];
  //   let res = getLineEndpoints(
  //     v_t.x,
  //     v_t.y,
  //     v_t.radius,
  //     v_t_2.x,
  //     v_t_2.y,
  //     v_t.radius
  //   );
  //   context.beginPath();
  //   context.moveTo(res.endpoint1.x, res.endpoint1.y);
  //   context.lineTo(res.endpoint2.x, res.endpoint2.y);
  //   context.stroke();
};

export const drawCanvas = (canvasRef, graph) => {
  canvas = canvasRef.current;
  if (!canvas) return;
  const context = canvas.getContext("2d");

  drawGraph(context, graph);
};

function getLineEndpoints(x1, y1, r1, x2, y2, r2) {
  // Calculate the vector from the center of the first circle to the center of the second circle
  let dx = x2 - x1;
  let dy = y2 - y1;

  // Calculate the distance between the centers of the circles
  let distance = Math.sqrt(dx * dx + dy * dy);
  // Normalize the vector
  let nx = dx / distance;
  let ny = dy / distance;

  let res = {
    endpoint1: { x: x1 + nx * r1, y: y1 + ny * r1 },
    endpoint2: { x: x2 - nx * r2, y: y2 - ny * r2 },
  };
  return res;
}
