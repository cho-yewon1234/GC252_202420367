const evaders = [];
const numEvaders = 5;
const pursuers = [];
const numPursuers = 2;
const seed = 0;

function setup() {
  createCanvas(800, 600);

  randomSeed(seed);

  for (let n = 0; n < numEvaders; n++) {
    evaders.push(new Evader(random(width), random(height)));
  }
  for (let n = 0; n < numPursuers; n++) {
    pursuers.push(new Pursuer(random(width), random(height)));
  }
}

function draw() {
  background(0);

  for (const evader of evaders) {
    evader.update();
    evader.evade(pursuers);
    evader.separate(evaders);
    evader.wrapCoordinates();
    evader.show();
  }

  for (const pursuer of pursuers) {
    pursuer.update();
    pursuer.pursue(evaders);
    pursuer.separate(pursuers);
    pursuer.wrapCoordinates();
    pursuer.show();
    pursuer.showTarget();
  }
}
