class Ball {
  posX = 0;
  posY = 0;
  diameter = 100;
  speed = 5;
  velX = 1;
  velY = 1;
  colour = 0;

  constructor(x, y, diameter, speed, colour) {
    this.posX = x;
    this.posY = y;
    this.diameter = diameter;
    this.speed = speed;
    this.colour = colour;

    this.randomAngle = random(360);
    this.resetVelocity();
  }

  update() {
    this.posX += this.velX;
    this.posY += this.velY;
  }

  resolveWallCollision() {
    if (this.posX > width - 0.5 * this.diameter) {
      this.velX *= -1;
    } else if (this.posX < 0.5 * this.diameter) {
      this.velX *= -1;
    }
    if (this.posY > height - 0.5 * this.diameter) {
      this.velY *= -1;
    } else if (this.posY < 0.5 * this.diameter) {
      this.velY *= -1;
    }
  }

  reset(x, y) {
    this.posX = x;
    this.posY = y;
    this.resetVelocity;
  }

  show() {
    fill(this.colour);
    noStroke();
    circle(this.posX, this.posY, this.diameter);
  }

  resetVelocity() {
    this.velX = this.speed * cos(radians(this.randomAngle));
    this.velY = this.speed * sin(radians(this.randomAngle));
  }
}
