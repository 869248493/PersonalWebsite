import { Clickable } from "./Clickable";

export class Vertex extends Clickable {
  constructor(v_id, radius, x = 0, y = 0) {
    super(x, y);
    this.id = v_id;
    this.neighbours = [];
    this.radius = radius;
  }

  get_id() {
    return this.id;
  }

  add_neighbour(neighbour) {
    this.neighbours.push(neighbour);
  }
  update_neighbour(neighbours) {
    //TODO
  }
}
