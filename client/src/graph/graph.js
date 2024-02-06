import { Vertex } from "./Vertex";

// unweighted undirected acylic graph
export class Graph {
  /**
   * @param {canvas width} max_width
   * @param {canvas height} max_height
   * @param {radius of vertex} v_radius
   * @param {gap between each vertex, in percentage of canvas} v_gap_percent
   */
  constructor(max_width, max_height, v_radius, v_gap_percent = 0.05) {
    this.vertices = [];
    this.edges = [];
    this.max_width = max_width;
    this.max_height = max_height;
    this.v_radius = v_radius;
    this.v_gap_percent = v_gap_percent;
  }

  get_gap() {
    return Math.min(this.max_width, this.max_height) * this.v_gap_percent;
  }

  gen_random(num_vertex) {
    for (let i = 0; i < num_vertex; i++) {
      let is_collision = true;
      let x_pos = 0;
      let y_pos = 0;
      // min distance from boundary
      const min_dist = this.v_radius + this.get_gap();

      // TODO: ? define max range from previous vertex
      while (is_collision) {
        x_pos = Math.floor(
          min_dist + (this.max_width - 2 * min_dist) * Math.random()
        );
        y_pos = Math.floor(
          min_dist + (this.max_height - 2 * min_dist) * Math.random()
        );
        is_collision = this.#check_collision(x_pos, y_pos);
      }
      let v_i = new Vertex(i, this.v_radius, x_pos, y_pos);
      this.vertices.push(v_i);
    }
  }

  get_graph() {
    return { vertices: this.vertices, edges: this.edges };
  }

  set_graph(graph_dict) {
    this.vertices = graph_dict.vertices;
    this.edges = graph_dict.edges;
  }

  add_undirected_edge(v_source, v_destination, update_neighbour = true) {
    const edge = new Edge(v_source, v_destination);
    this.edges.push(edge);
    if (update_neighbour) {
      v_source.add_neighbour(v_destination);
      v_destination.add_neighbour(v_source);
    }
  }

  #check_collision(x, y) {
    const r = this.v_radius;
    const gap = this.get_gap();
    const collision_distance = r + gap;

    for (const vertex of this.vertices) {
      const pos = vertex.get_pos();
      const dx = pos.x - x;
      const dy = pos.y - y;
      if (Math.sqrt(dx * dx + dy * dy) < collision_distance) {
        return true;
      }
    }
    return false;
  }
}

export class Edge {
  constructor(v_source, v_destination) {
    this.v_source = v_source;
    this.v_destination = v_destination;
  }

  get_source() {
    return this.v_source;
  }

  get_destination() {
    return this.v_destination;
  }
}
