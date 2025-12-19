class SecBall {
  posX = 0;
  posY = 0;
  diameter = 25;
  speed = 150;
  velX = 1;
  velY = 1;
  colour = "#222222";
  seeColour = "#FFB21A";

  constructor(x, y, secValue) {
    this.posX = x;
    this.posY = y;
    this.secValue = secValue;
    // this.resetVelocity();
  }
  //위치에 속도를 더해 공 이동
  update() {
    const delta = deltaTime / 1000;
    this.posX += this.velX * delta;
    this.posY += this.velY * delta;
  }
  //화면 밖으로 나가지 않게
  resolveWallCollision() {
    const radius = this.diameter * 0.5;
    if (this.posX + radius > width || this.posX - radius < 0) {
      this.velX *= -1; // 속도 반전
      // 공이 벽을 파고들지 않도록 위치 보정
      this.posX = this.posX - radius < 0 ? radius : width - radius;
    }
    // 상하 벽 충돌 검사
    if (this.posY + radius > height || this.posY - radius < 0) {
      this.velY *= -1; // 속도 반전
      // 공이 벽을 파고들지 않도록 위치 보정
      this.posY = this.posY - radius < 0 ? radius : height - radius;
    }
  }
  show() {
    if (this.colour === "#222222") {
      return;
    }

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
  //마우스가 공위로
  isHovered() {
    let dx = this.posX - mouseX;
    let dy = this.posY - mouseY;
    // let dist = sqrt(dx * dx + dy * dy);
    let dist = (dx ** 2 + dy ** 2) ** (1 / 2);
    return dist < 0.5 * this.diameter;
  }
}
