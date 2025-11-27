const canvasContainer = document.getElementById('canvas-container');

let cellSize;
const cellsPerRow = 11;
const cells = [];
let hoveredCell = null;

function setup() {
  const renderer = createCanvas(660, 660);
  renderer.parent(canvasContainer);

  cellSize = width / cellsPerRow;
  for (let n = 0; n < cellsPerRow; n++) {
    cells.push(
      new Cell(
        [n * cellSize + 0.5 * width - 0.5 * cellsPerRow * cellSize, 0],
        [cellSize, cellSize]
      )
    );
  }
  cells.forEach((cell, idx) => {
    cell.setNeighbors(cells[idx - 1], cells[idx + 1]);
  });
  console.log(cells);
  cells[Math.floor(cellsPerRow / 2)].state = true;

  for (let gen = 1; gen < Math.floor(height / cellSize); gen++) {
    createNextGen();
  }
}

function createNextGen() {
  const idxBegin = cells.length - cellsPerRow;
  for (let n = 0; n < cellsPerRow; n++) {
    idx = idxBegin + n;
    cells[idx].computeNextState();
    cells.push(
      new Cell(
        [cells[idx].pos[0], cells[idx].pos[1] + cellSize],
        [cellSize, cellSize],
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

  cells.forEach((cell) => cell.render(hoveredCell === cell));

  let ruleString = '';
  for (let idx = 0; idx < 8; idx++) {
    const key = idx.toString(2).padStart(3, '0');
    ruleString += Cell.rule[key];
  }
  fill('red');
  noStroke();
  textSize(16);
  textAlign(LEFT, TOP);
  text(`Rule: ${ruleString}`, 10, 10);
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
  if (key === 'ArrowLeft') {
    let ruleString = '';
    for (let idx = 0; idx < 8; idx++) {
      const key = idx.toString(2).padStart(3, '0');
      ruleString += Cell.rule[key];
    }
    const ruleNum = parseInt(ruleString, 2);
    if (ruleNum === 0) return;
    const newRuleNum = (ruleNum - 1) % 256;
    const newRuleString = newRuleNum.toString(2).padStart(8, '0');
    Cell.setRule(newRuleString);
    cells.forEach((cell, idx) => {
      cell.computeNextState();
      if (cells[idx + cellsPerRow]) {
        cells[idx + cellsPerRow].state = cell.nextState;
      }
    });
  } else if (key === 'ArrowRight') {
    let ruleString = '';
    for (let idx = 0; idx < 8; idx++) {
      const key = idx.toString(2).padStart(3, '0');
      ruleString += Cell.rule[key];
    }
    const ruleNum = parseInt(ruleString, 2);
    if (ruleNum === 255) return;
    const newRuleNum = (ruleNum + 1) % 256;
    const newRuleString = newRuleNum.toString(2).padStart(8, '0');
    Cell.setRule(newRuleString);
    cells.forEach((cell, idx) => {
      cell.computeNextState();
      if (cells[idx + cellsPerRow]) {
        cells[idx + cellsPerRow].state = cell.nextState;
      }
    });
  }
}
