class Particle {
  pos;
  W;
  H;
  colour;
  angle;
  constructor(posX, posY, area, minSize = 4) {
    this.pos = createVector(posX, posY);
    this.W = random(minSize, area);
    this.H = area / this.W;
    this.angle = random(360);
    const paletteIdx = floor(random(palette.length));
    this.colour = palette[paletteIdx];
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
