class Particle {
  pos;
  vel;
  acc;
  W;
  H;
  colour;
  angle;
  constructor(posX, posY, velAngleRange, speed, area, minSize = 4) {
    this.pos = createVector(posX, posY);
    const randomAngle = -90 + random(-0.5 * velAngleRange, 0.5 * velAngleRange);
    this.vel = createVector(speed, 0);
    this.vel.rotate(radians(velAngleRange));
    this.acc = createVector(0, 0);
    this.W = random(minSize, area);
    this.H = area / this.W;
    this.angle = random(360);
    const paletteIdx = floor(random(palette.length));
    this.colour = palette[paletteIdx];
  }

  applyGravity(y) {
    this.acc.add(0, y);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  drawRect() {
    fill(this.colour);
    noStroke();
    push();
    translate(this.pos.x, this.pos.y);
    rotate(radians(this.angle));
    rect(-5 * this.W, -15 * this.H, this.W, this.H);
    pop();
  }
}
