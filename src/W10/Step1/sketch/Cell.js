class Cell {
  pos = [0, 0];
  size = [0, 0];
  state = false;
  nextState = false;
  neighbors = [null, null];
  rule = "00010011";

  constructor(x, y, w, h, state = false) {
    this.pos = [x, y];
    this.size = [w, h];
    this.state = state;
  }

  setNeighbors(left, right) {
    this.neighbors[0] = left;
    this.neighbors[1] = right;
  }

  getCombinedState() {
    const binaryString = `${this.neighbors[0]?.state ? 1 : 0}${
      this.state ? 1 : 0
    }${this.neighbors[1]?.state ? 1 : 0}`;
    const decimalNum = parseInt(binaryString, 2);
    return decimalNum;
  }

  getNextState() {
    const combinedState = this.getCombinedState();
    const nextStateString = this.rule.charAt(7 - combinedState);
    return nextStateString === "1";
  }

  computeNextState() {
    this.nextState = this.getNextState();
  }

  updateState() {
    this.state = this.nextState;
  }

  isHovered(mX, mY) {
    return (
      mX >= this.pos[0] &&
      mX <= this.pos[0] + this.size[0] &&
      mY >= this.pos[1] &&
      mY <= this.pos[1] + this.size[1]
    );
  }

  toggleState() {
    this.state = !this.state;
  }

  render() {
    strokeWeight(2);
    stroke(200);
    if (this.state) {
      fill(0);
    } else {
      noFill();
    }
    rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
  }
}
