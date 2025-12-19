class MinBall {
  pos;
  vel;
  acc;
  mass;

  diameter = 60;
  speed = 5;

  colour = "#222222";
  seeColour = "#134686";

  //p5.vector 사용 위치 속도 설정
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.colour = "#222222";
    this.resetVelocity();

    //질량 계산
    this.mass = Math.PI * (this.diameter / 2) ** 2;
  }
  //위치에 속도를 더해 공 이동
  update() {
    // this.pos.add(this.vel);
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
  //화면 밖으로 나가지 않게
  resolveWallCollision() {
    const restitution = 1.0;

    if (this.pos.x > width - 0.5 * this.diameter) {
      this.pos.x = width - this.diameter * 0.5;
      this.vel.x *= -restitution;
    } else if (this.pos.x < 0.5 * this.diameter) {
      this.pos.x = 0.5 * this.diameter;
      this.vel.x *= -restitution;
    }
    if (this.pos.y > height - 0.5 * this.diameter) {
      this.pos.y = height - 0.5 * this.diameter;
      this.vel.y *= -restitution;
    } else if (this.pos.y < 0.5 * this.diameter) {
      this.pos.y = 0.5 * this.diameter;
      this.vel.y *= -restitution;
    }
  }

  resolveBallCollision(other) {
    const restitution = 1.0;

    const dist = p5.Vector.dist(this.pos, other.pos);
    const minDist = (this.diameter + other.diameter) / 2;
    if (dist < minDist) {
      // 위치 보정
      const toOtherVec = p5.Vector.sub(other.pos, this.pos);
      const diff = minDist - dist;
      const correctionVec = p5.Vector.setMag(toOtherVec, diff / 2);
      other.pos.add(correctionVec);
      this.pos.sub(correctionVec);

      const normalVec = p5.Vector.setMag(toOtherVec, 1);

      // 속도 보정
      const vx1Ref = normalVec.dot(this.vel);
      const vx2Ref = normalVec.dot(other.vel);

      const denominator = this.mass + other.mass;
      const vx1After =
        (vx1Ref * (this.mass - other.mass) + 2 * other.mass * vx2Ref) /
        denominator;
      const vx2After =
        (vx2Ref * (other.mass - this.mass) + 2 * this.mass * vx1Ref) /
        denominator;

      const vx1Vec = p5.Vector.mult(normalVec, vx1After);
      const vx2Vec = p5.Vector.mult(normalVec, vx2After);

      const tangentVec = p5.Vector.rotate(normalVec, Math.PI * 0.5);

      const vy1Ref = tangentVec.dot(this.vel);
      const vy2Ref = tangentVec.dot(other.vel);

      const vy1Vec = p5.Vector.mult(tangentVec, vy1Ref);
      const vy2Vec = p5.Vector.mult(tangentVec, vy2Ref);

      const newVel1 = p5.Vector.add(vx1Vec, vy1Vec);
      const newVel2 = p5.Vector.add(vx2Vec, vy2Vec);

      newVel1.mult(restitution);
      newVel2.mult(restitution);

      this.vel.set(newVel1);
      other.vel.set(newVel2);
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
    circle(this.pos.x, this.pos.y, this.diameter);
  }

  reset(x, y) {
    this.pos.set(x, y);
    this.resetVelocity();
  }

  // MinBall 클래스 내부의 resetVelocity() 함수

  resetVelocity() {
    let randomAngle = random(360);

    const velX = this.speed * cos(radians(randomAngle));
    const velY = this.speed * sin(radians(randomAngle));

    this.vel.set(velX, velY);
  }
  //마우스가 공위로
  isHovered() {
    let dx = this.pos.x - mouseX;
    let dy = this.pos.y - mouseY;
    // let dist = sqrt(dx * dx + dy * dy);
    let dist = (dx ** 2 + dy ** 2) ** (1 / 2);
    return dist < 0.5 * this.diameter;
  }
}
