class Cell {
  pos = [0, 0];
  size = [0, 0];
  state = false;
  neighbors = [null, null, null, null, null, null, null, null];
  nextState = false;
  static rule(neightbors, currentState) {
    const livingNeighborsCnt = neightbors.filter((neighbor) => {
      if (neighbor) return neighbor.state;
    }).length;
    if (livingNeighborsCnt < 2) return false; // 고립
    if (livingNeighborsCnt > 3) return false; // 과잉 인구
    if (livingNeighborsCnt === 3) return true; // 새로 태어남
    return currentState && livingNeighborsCnt === 2; // 현재 상태 유지
  }

  constructor(pos, size, state = false) {
    this.pos = pos;
    this.size = size;
    this.state = state;
  }

  setNeighbors(neighbors) {
    this.neighbors = neighbors;
  }

  computeNextState() {
    this.nextState = Cell.rule(this.neighbors, this.state);
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
      stroke('grey');
    }
    if (this.state) {
      fill('black');
    } else {
      noFill();
    }
    rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
  }
}
