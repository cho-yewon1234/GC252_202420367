class Cell {
  pos = [0, 0];
  size = [0, 0];
  state = false;
  left = null;
  right = null;
  nextState = false;
  static rule = {
    '000': 1,
    '001': 1,
    '010': 0,
    '011': 0,
    100: 1,
    101: 0,
    110: 0,
    111: 0,
  };

  constructor(pos, size, state = false) {
    this.pos = pos;
    this.size = size;
    this.state = state;
  }

  setNeighbors(left, right) {
    this.left = left;
    this.right = right;
  }

  getCombinedStates() {
    return `${this.left ? (this.left.state ? '1' : '0') : '0'}${
      this.state ? '1' : '0'
    }${this.right ? (this.right.state ? '1' : '0') : '0'}`;
  }

  computeNextState() {
    const combinedStates = this.getCombinedStates();
    this.nextState = Cell.rule[combinedStates] === 1;
  }

  updateState() {
    this.state = this.nextState;
  }

  toggleState() {
    this.state = !this.state;
  }

  isHovered(mouseX, mouseY) {
    return (
      mouseX >= this.pos[0] &&
      mouseX < this.pos[0] + this.size[0] &&
      mouseY >= this.pos[1] &&
      mouseY < this.pos[1] + this.size[1]
    );
  }

  render(isHovered = false) {
    if (isHovered) {
      stroke('red');
    } else {
      stroke('black');
    }
    if (this.state) {
      fill('black');
    } else {
      noFill();
    }
    rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
  }
}
