const elem = document.querySelector("#matter-box");
console.log(elem);

// module aliases
// const Engine = Matter.Engine,
//   Render = Matter.Render,
//   Runner = Matter.Runner,
//   Bodies = Matter.Bodies,
//   Composite = Matter.Composite;
const { Engine, Render, Runner, Bodies, Composite } = Matter;

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
  element: elem,
  engine: engine,
});

// create two boxes and a ground
const boxA = Bodies.rectangle(400, 200, 100, 80);
const boxB = Bodies.rectangle(450, 50, 80, 120);
const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [ground, boxA, boxB]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);
