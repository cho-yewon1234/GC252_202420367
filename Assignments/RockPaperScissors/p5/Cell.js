class Cell {
  pos = [0, 0];
  size = [0, 0];
  state = 'rock';
  neighbors = [null, null, null, null, null, null, null, null];
  nextState = 'rock';

  static rule(neightbors, currentState) {
    const randomNeighbor = () => {
      const existingNeighbors = neightbors.filter((neighbor) => neighbor);
      const randomIdx = Math.floor(random(existingNeighbors.length));
      return existingNeighbors[randomIdx];
    };
    const isPredetor =
      currentState === 'rock'
        ? randomNeighbor().state === 'paper'
        : currentState === 'paper'
        ? randomNeighbor().state === 'scissors'
        : randomNeighbor().state === 'rock';
    if (isPredetor) {
      return randomNeighbor().state;
    }
    return currentState;
  }

  constructor(pos, size, state = 'rock') {
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
    this.state =
      this.state === 'rock'
        ? 'paper'
        : this.state === 'paper'
        ? 'scissors'
        : 'rock';
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
    noFill();
    if (isHovered) {
      stroke('black');
    } else {
      stroke('lightgray');
    }
    rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);

    noStroke();
    if (this.state === 'rock') {
      fill('#ED3F27');
    } else if (this.state === 'paper') {
      fill('#FEB21A');
    } else {
      fill('#134686');
    }
    // ellipse(
    //   this.pos[0] + this.size[0] * 0.5,
    //   this.pos[1] + this.size[1] * 0.5,
    //   this.size[0] * 0.8,
    //   this.size[1] * 0.8
    // );
    rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
  }
}
