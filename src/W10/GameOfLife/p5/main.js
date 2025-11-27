const canvasContainer = document.getElementById('canvas-container');

let cellSize;
const cellsPerRow = 80;
let cellsPerColumn;
const cells = [];
let hoveredCell = null;

let flagStop = false;
const interval = 250;
let lastMs = 0;

let gen = 0;

const seed = 1;

function setup() {
  const renderer = createCanvas(800, 600);
  renderer.parent(canvasContainer);

  randomSeed(seed);

  cellSize = width / cellsPerRow;
  cellsPerColumn = Math.floor(height / cellSize);
  for (let idx = 0; idx < cellsPerRow * cellsPerColumn; idx++) {
    const x =
      (idx % cellsPerRow) * cellSize +
      0.5 * width -
      0.5 * cellsPerRow * cellSize;
    const y = Math.floor(idx / cellsPerRow) * cellSize;
    cells.push(new Cell([x, y], [cellSize, cellSize], random() < 0.1));
  }
  cells.forEach((cell, idx) => {
    const row = Math.floor(idx / cellsPerRow);
    const col = idx % cellsPerRow;

    const tl = col > 0 && row > 0 ? cells[idx - cellsPerRow - 1] : null;
    const t = row > 0 ? cells[idx - cellsPerRow] : null;
    const tr =
      col < cellsPerRow - 1 && row > 0 ? cells[idx - cellsPerRow + 1] : null;
    const l = col > 0 ? cells[idx - 1] : null;
    const r = col < cellsPerRow - 1 ? cells[idx + 1] : null;
    const bl =
      col > 0 && row < cellsPerColumn - 1 ? cells[idx + cellsPerRow - 1] : null;
    const b = row < cellsPerColumn - 1 ? cells[idx + cellsPerRow] : null;
    const br =
      col < cellsPerRow - 1 && row < cellsPerColumn - 1
        ? cells[idx + cellsPerRow + 1]
        : null;

    const neighbors = [tl, t, tr, l, r, bl, b, br];

    cell.setNeighbors(neighbors);
  });
  console.log(cells);
}

function draw() {
  if (millis() - lastMs > interval && !flagStop) {
    lastMs = millis();
    cells.forEach((cell) => cell.computeNextState());
    cells.forEach((cell) => cell.updateState());
    gen++;
  }
  background(220);

  cells.forEach((cell) => cell.render(hoveredCell === cell));

  fill('red');
  noStroke();
  textSize(16);
  textAlign(LEFT, TOP);
  text(`Generation: ${gen}`, 10, 10);
}

function mouseMoved() {
  hoveredCell = null;
  for (let idx = 0; idx < cells.length; idx++) {
    if (cells[idx].isHovered(mouseX, mouseY)) {
      hoveredCell = cells[idx];
      break;
    }
  }
}

function mousePressed() {
  if (hoveredCell) {
    hoveredCell.toggleState();
  }
}

function keyPressed() {
  if (key === ' ') {
    flagStop = !flagStop;
    lastMs = millis();
  }
}
