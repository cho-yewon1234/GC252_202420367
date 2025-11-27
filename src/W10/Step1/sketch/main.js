const canvasContainer = document.getElementById("canvas-container");
let renderer;

const INITIAL_W = 800;
const INITIAL_H = 600;
const INITIAL_RATIO = INITIAL_W / INITIAL_H;

const cellsNum = 3;
const cells = [];
const cellSize = 100;

let hoveredCell = null;

function setup() {
  renderer = createCanvas(INITIAL_W, INITIAL_H);
  renderer.parent(canvasContainer);
  renderer.elt.style.aspectRatio = `${INITIAL_W} / ${INITIAL_H}`;

  new ResizeObserver(() => {
    const { width: containerWidth, height: containerHeight } =
      canvasContainer.getBoundingClientRect();
    renderer.elt.style.width = `${containerWidth}px`;
    renderer.elt.style.height = `${containerWidth / INITIAL_RATIO}px`;
  }).observe(canvasContainer);

  for (let n = 0; n < cellsNum; n++) {
    const x = width * 0.5 - 0.5 * cellSize * cellsNum + n * cellSize;
    const y = height * 0.5 - 0.5 * cellSize;
    const w = cellSize;
    const h = cellSize;
    const cell = new Cell(x, y, w, h, Math.floor(cellsNum / 2) === n);
    cells.push(cell);
  }

  cells.forEach((cell, idx) => {
    const left = cells[idx - 1];
    const right = cells[idx + 1];
    // console.log(idx, left, right);
    cell.setNeighbors(left, right);
  });
}

function draw() {
  background(250);
  cells.forEach((cell) => cell.render());
}

function mouseMoved() {
  hoveredCell = null;
  for (const cell of cells) {
    if (cell.isHovered(mouseX, mouseY)) {
      hoveredCell = cell;
      break;
    }
  }
  // console.log(hoveredCell);
}

function mousePressed() {
  hoveredCell?.toggleState();
  console.log(hoveredCell?.getCombinedState());
  console.log(hoveredCell?.getNextState());
}

function keyPressed() {
  if (key === "ArrowDown") {
    cells.forEach((cell) => cell.computeNextState());
    cells.forEach((cell) => cell.updateState());
  } else if (key === "ArrowUp") {
    cells.forEach(
      (cell, idx) => (cell.state = Math.floor(cellsNum / 2) === idx)
    );
  }
}
