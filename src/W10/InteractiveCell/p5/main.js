const canvasContainer = document.getElementById('canvas-container');

const CELL_SIZE = 50;
const cellsNum = 3;
const cells = [];
let hoveredCell = null;

function setup() {
  const renderer = createCanvas(800, 600);
  renderer.parent(canvasContainer);

  for (let n = 0; n < cellsNum; n++) {
    cells.push(
      new Cell(
        [
          n * CELL_SIZE + 0.5 * width - 0.5 * cellsNum * CELL_SIZE,
          height / 2 - 0.5 * CELL_SIZE,
        ],
        [CELL_SIZE, CELL_SIZE]
      )
    );
  }
  cells.forEach((cell, idx) => {
    cell.setNeighbors(cells[idx - 1], cells[idx + 1]);
  });
  console.log(cells);
}

function draw() {
  background(200);

  let ruleString = '';
  // for (key in Cell.rule) {
  //   ruleString += Cell.rule[key];
  // }
  for (let idx = 0; idx < 8; idx++) {
    const key = idx.toString(2).padStart(3, '0');
    ruleString += Cell.rule[key];
  }
  fill(0);
  noStroke();
  textSize(16);
  textAlign(LEFT, TOP);
  text(`Rule: ${ruleString}`, 10, 10);

  let stateString = cells[1].getCombinedStates();
  text(`State: ${stateString}`, 10, 30);

  cells.forEach((cell) => cell.render(hoveredCell === cell));
}

function mouseMoved() {
  hoveredCell = null;
  cells.forEach((cell) => {
    if (cell.isHovered(mouseX, mouseY)) {
      hoveredCell = cell;
    }
  });
}

function mousePressed() {
  if (hoveredCell) {
    hoveredCell.toggleState();
  }
}

function keyPressed() {
  cells.forEach((cell) => cell.computeNextState());
  cells.forEach((cell) => cell.updateState());
}
