class HourBall {
  posX = 0;
  posY = 0;
  diameter = 100;
  speed = 2;
  velX = 1;
  velY = 1;
  colour = "#222222";
  seeColour = "#2ecc71";
  seehour;

  constructor(x, y, seeHour) {
    this.posX = x;
    this.posY = y;

    this.colour = "#222222";
    this.seeHour = seeHour;
    this.resetVelocity();
  }
  //위치에 속도를 더해 공 이동
  update() {
    this.posX += this.velX;
    this.posY += this.velY;
  }
  //화면 밖으로 나가지 않게
  resolveWallCollision() {
    if (this.posX > width - 0.5 * this.diameter) {
      this.velX *= -1;
      this.posX = width - 0.5 * this.diameter;
    } else if (this.posX < 0.5 * this.diameter) {
      this.velX *= -1;
      this.posX = 0.5 * this.diameter;
    }
    if (this.posY > height - 0.5 * this.diameter) {
      this.velY *= -1;
      this.posY = height - 0.5 * this.diameter;
    } else if (this.posY < 0.5 * this.diameter) {
      this.velY *= -1;
      this.posY = 0.5 * this.diameter;
    }
  }
  show() {
    if (this.colour === "#222222") {
      return;
    }

    if (this.isHovered()) {
      stroke(this.colour);
      strokeWeight(2);
      fill(this.colour);
      circle(this.posX, this.posY, this.diameter);

      fill(255);
      textAlign(CENTER, CENTER);
      textSize(this.diameter * 0.4);
      text(this.seeHour, this.posX, this.posY);
    } else {
      stroke(this.colour);
      strokeWeight(1);
      noFill();
      circle(this.posX, this.posY, this.diameter);
    }
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
  //마우스가 공위로
  isHovered() {
    let dx = this.posX - mouseX;
    let dy = this.posY - mouseY;
    // let dist = sqrt(dx * dx + dy * dy);
    let dist = (dx ** 2 + dy ** 2) ** (1 / 2);
    return dist < 0.5 * this.diameter;
  }
}
