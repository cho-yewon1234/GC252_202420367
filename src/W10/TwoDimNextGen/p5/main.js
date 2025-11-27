const canvasContainer = document.getElementById('canvas-container');

const CELL_SIZE = 50;
const cellsPerRow = 3;
const cells = [];
let hoveredCell = null;

function setup() {
  const renderer = createCanvas(800, 600);
  renderer.parent(canvasContainer);

  for (let n = 0; n < cellsPerRow; n++) {
    cells.push(
      new Cell(
        [n * CELL_SIZE + 0.5 * width - 0.5 * cellsPerRow * CELL_SIZE, 0],
        [CELL_SIZE, CELL_SIZE]
      )
    );
  }
  cells.forEach((cell, idx) => {
    cell.setNeighbors(cells[idx - 1], cells[idx + 1]);
  });
  console.log(cells);
}

function createNextGen() {
  const idxBegin = cells.length - cellsPerRow;
  for (let n = 0; n < cellsPerRow; n++) {
    idx = idxBegin + n;
    cells[idx].computeNextState();
    cells.push(
      new Cell(
        [cells[idx].pos[0], cells[idx].pos[1] + CELL_SIZE],
        [CELL_SIZE, CELL_SIZE],
        cells[idx].nextState
      )
    );
  }
  for (let idx = cells.length - cellsPerRow; idx < cells.length; idx++) {
    cells[idx].setNeighbors(cells[idx - 1], cells[idx + 1]);
  }
}

function draw() {
  background(200);

  let ruleString = '';
  for (let idx = 0; idx < 8; idx++) {
    const key = idx.toString(2).padStart(3, '0');
    ruleString += Cell.rule[key];
  }
  fill(0);
  noStroke();
  textSize(16);
  textAlign(LEFT, TOP);
  text(`Rule: ${ruleString}`, 10, 10);

  let stateString = cells[cells.length - 2].getCombinedStates();
  text(`State: ${stateString}`, 10, 30);

  cells.forEach((cell) => cell.render(hoveredCell === cell));
}

function mouseMoved() {
  hoveredCell = null;
  for (let idx = 0; idx < cellsPerRow; idx++) {
    if (cells[idx].isHovered(mouseX, mouseY)) {
      hoveredCell = cells[idx];
    }
  }
}

function mousePressed() {
  if (hoveredCell) {
    hoveredCell.toggleState();
  }
  cells.forEach((cell, idx) => {
    cell.computeNextState();
    if (cells[idx + cellsPerRow]) {
      cells[idx + cellsPerRow].state = cell.nextState;
    }
  });
}

function keyPressed() {
  console.log(key);
  if (key === 'ArrowDown') {
    createNextGen();
  } else if (key === 'ArrowUp') {
    cells.length = cellsPerRow;
  }
}
