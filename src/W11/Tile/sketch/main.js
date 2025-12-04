const sketchContainer = document.querySelector(".sketch-container");

const tileImgs = [];

const tiles = [];
const tilePerRow = 10;
let tileSize;
let tilePerCol;

function preload() {
  for (let n = 0; n < 16; n++) {
    const urlString = `./assets/${String(n).padStart(2, "0")}.svg`;
    tileImgs.push(loadImage(urlString));
  }
}

function setup() {
  const renderer = createCanvas(600, 600);
  renderer.parent(sketchContainer);

  tileSize = width / tilePerRow;
  tilePerCol = Math.floor(height / tileSize);

  for (let r = 0; r < tilePerCol; r++) {
    for (let c = 0; c < tilePerRow; c++) {
      const x = c * tileSize;
      const y = r * tileSize;
      const randomState = random() < 0.5;
      const newTile = new Tile(x, y, tileSize, tileSize, randomState);
      tiles.push(newTile);
    }
  }

  function tileIdx(x, y) {
    return y * tilePerRow + x;
  }

  tiles.forEach((aTile, idx) => {
    const col = idx % tilePerRow;
    const row = Math.floor(idx / tilePerRow);

    const t = row > 0 ? tiles[tileIdx(col, row - 1)] : null;
    const l = col > 0 ? tiles[tileIdx(col - 1, row)] : null;
    const b = row < tilePerCol - 1 ? tiles[tileIdx(col, row + 1)] : null;
    const r = col < tilePerRow - 1 ? tiles[tileIdx(col + 1, row)] : null;

    aTile.setNeighbor(t, l, b, r);
  });

  tiles.forEach((aTile) => {
    aTile.computeStates();
  });
}
function draw() {
  background(220);
  tiles.forEach((aTile) => {
    aTile.render(tileImgs);
  });
}
