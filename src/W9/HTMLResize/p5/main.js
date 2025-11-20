const INITIAL_W = 500;
const INITIAL_H = 600;

const canvasContainer = document.getElementById("canvas-container");
console.log(canvasContainer);

function resizeHandler(entries) {
  entries.forEach((entry) => {
    const { width: containerW, height: containerH } = entry.contentRect;
    console.log(containerW, containerH);

    const aspect = INITIAL_W / INITIAL_H;

    let newW = containerW;
    let newH = newW / aspect;
    // if (newH > containerH) {
    //   newH = containerH;
    //   newW = newH * aspect;
    // }
    resizeCanvas(Math.floor(newW), Math.floor(newH));
  });
}

function setup() {
  const renderer = createCanvas(INITIAL_W, INITIAL_H);
  renderer.parent(canvasContainer);

  canvasContainer.style.aspectRatio = `${INITIAL_W} / ${INITIAL_H}`;
  const resizeObserver = new ResizeObserver(resizeHandler);
  resizeObserver.observe(canvasContainer);
}

function draw() {
  background(0);
  fill("red");
  circle(width / 2, height / 2, 100);
}
