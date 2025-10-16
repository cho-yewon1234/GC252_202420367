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

  show() {
    if (this.isHovered()) {
      fill(this.colour);
      noStroke();
    } else {
      stroke(this.colour);
      noFill();
    }
    circle(this.posX, this.posY, this.diameter);
  }

  reset(x, y) {
    this.posX = x;
    this.posY = y;
    this.resetVelocity();
  }

  resetVelocity() {
    let randomAngle = random(360);
    this.velX = this.speed * cos(radians(randomAngle));
    this.velY = this.speed * sin(radians(randomAngle));
  }

  isHovered() {
    let dx = this.posX - mouseX;
    let dy = this.posY - mouseY;
    // let dist = sqrt(dx * dx + dy * dy);
    let dist = (dx ** 2 + dy ** 2) ** (1 / 2);
    return dist < 0.5 * this.diameter;
  }
}
