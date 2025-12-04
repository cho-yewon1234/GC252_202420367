class Tile {
  pos = [0, 0];
  size = [1, 1];
  neighbors = [null, null, null, null]; // top, left, bottom, right
  state = false;
  tileImgIdx = 0;

  constructor(x, y, w, h, state = false) {
    this.pos[0] = x;
    this.pos[1] = y;
    this.size[0] = w;
    this.size[1] = h;
    this.state = state;
  }

  setNeighbor(t, l, b, r) {
    this.neighbors[0] = t;
    this.neighbors[1] = l;
    this.neighbors[2] = b;
    this.neighbors[3] = r;
  }

  computeStates() {
    let binaryString = "";
    this.neighbors.forEach((aNeighbor) => {
      binaryString += aNeighbor?.state ? "1" : "0";
    });
    this.tileImgIdx = parseInt(binaryString, 2);
  }

  isHovered(mx, my) {
    return (
      mx >= this.pos[0] &&
      mx <= this.pos[0] + this.size[0] &&
      my >= this.pos[1] &&
      my <= this.pos[1] + this.size[1]
    );
  }
  toggleState() {
    this.state = !this.state;
  }

  render(tiles) {
    image(
      tiles[this.tileImgIdx],
      this.pos[0],
      this.pos[1],
      this.size[0],
      this.size[1]
    );
  }
}
