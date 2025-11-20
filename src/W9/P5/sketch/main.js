const {
  Engine,
  Runner,
  Composites,
  MouseConstraint,
  Mouse,
  Composite,
  Bodies,
} = Matter;

let stack;
let walls;

const canvasContainer = document.getElementById("canvas-container");

function setup() {
  const renderer = createCanvas(800, 600);
  renderer.parent(canvasContainer);

  const engine = Engine.create(),
    world = engine.world;

  stack = Composites.stack(20, 20, 10, 5, 0, 0, (x, y) => {
    if (random() < 0.8) {
      return Bodies.rectangle(x, y, random(25, 50), random(25, 50));
    } else {
      return Bodies.rectangle(x, y, random(80, 120), random(25, 30));
    }
  });
  Composite.add(world, stack);

  walls = [
    Bodies.rectangle(0.5 * width, 0, width, 50, { isStatic: true }),
    Bodies.rectangle(0.5 * width, height, width, 50, { isStatic: true }),
    Bodies.rectangle(0, 0.5 * height, 50, height, { isStatic: true }),
    Bodies.rectangle(width, 0.5 * height, 50, height, { isStatic: true }),
  ];
  Composite.add(world, walls);

  console.log(stack);
  console.log(walls);

  const mouse = Mouse.create(renderer.elt);
  mouse.pixelRatio = pixelDensity();
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.2,
    },
  });
  Composite.add(world, mouseConstraint);

  const runner = Runner.create();
  Runner.run(runner, engine);
}

function draw() {
  background(0);
  noStroke();
  fill("red");
  circle(width / 2, height / 2, 100);
  stroke("white");
  noFill();
  stack.bodies.forEach((aBody) => {
    beginShape();
    aBody.vertices.forEach((aVertex) => {
      vertex(aVertex.x, aVertex.y);
    });
    endShape(CLOSE);
  });
  walls.forEach((aBody) => {
    beginShape();
    aBody.vertices.forEach((aVertex) => {
      vertex(aVertex.x, aVertex.y);
    });
    endShape(CLOSE);
  });
}
