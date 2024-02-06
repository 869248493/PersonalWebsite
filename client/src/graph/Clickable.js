export class Clickable {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  get_pos() {
    return { x: this.x, y: this.y };
  }

  get_x() {
    return this.x;
  }

  get_y() {
    return this.y;
  }
}
