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

      // TODO: define max range from previous vertex
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

    this.vertices.forEach((vertex) => {
      console.log(vertex.x);
    });
  }

  get_graph() {
    return { verticies: this.vertices, edges: this.edges };
  }

  #check_collision(x, y) {
    const r = this.v_radius;
    const gap = this.get_gap();
    const collision_distance = r + gap;

    // check for boundary collision

    // check for collision with other circles
    for (const vertex of this.vertices) {
      const dx = vertex.get_x() - x;
      const dy = vertex.get_y() - y;
      if (Math.sqrt(dx * dx + dy * dy) < collision_distance) {
        return true;
      }
    }
    return false;
  }
}

class Vertex {
  constructor(v_id, radius, x = 0, y = 0) {
    this.id = v_id;
    this.neighbours = [];
    this.edges = [];
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  set_pos() {}

  get_x() {
    return this.x;
  }

  get_y() {
    return this.y;
  }
}

class Edge {
  constructor(v_start, v_end) {
    this.v_start = v_start;
    this.v_end = v_end;
  }
}
