class Pursuer {
  constructor(x, y, options) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = options?.r || 25;
    this.colour = options?.colour || '#FF0000';
    this.maxSpeed = options?.maxSpeed || 5;
    this.maxForce = options?.maxForce || 0.05;
  }

  findClosestEvader(evaders) {
    let closest = null;
    let minDist = Infinity;
    for (const e of evaders) {
      const d = this.pos.dist(e.pos);
      if (d < minDist) {
        minDist = d;
        closest = e;
      }
    }
    return closest;
  }

  separate(evaders) {
    for (const e of evaders) {
      if (e !== this) {
        const d = this.pos.dist(e.pos);
        const sum = createVector(0, 0);
        if (d > 0 && d < this.r * 2) {
          const towardMe = p5.Vector.sub(this.pos, e.pos);
          towardMe.div(d);
          sum.add(towardMe);
        }
        if (sum.mag() > 0) {
          sum.setMag(this.maxSpeed);
          sum.add(this.pos);
          this.seek(sum);
        }
      }
    }
  }
  // 속도, 위치, 가속도 업데이트 및 리셋
  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  // 가속도 추가
  applyForce(force) {
    this.acc.add(force);
  }
  // 목표 위치로 향하는 st
  seek(target) {
    const desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    const steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }
  // 도망자의 미래 예측 후 그곳으로 향하기
  pursue(evaders, prediction = 30) {
    const closest = this.findClosestEvader(evaders);
    if (!closest) return;
    const predictedVel = p5.Vector.mult(closest.vel, prediction);
    const predictedPos = p5.Vector.add(closest.pos, predictedVel);
    this.seek(predictedPos);
  }

  wrapCoordinates() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  show() {
    const angle = this.vel.heading();
    push();
    translate(this.pos.x, this.pos.y);
    rotate(angle);
    noStroke();
    fill(this.colour);
    beginShape();
    vertex(0, 0);
    vertex(this.r * Math.cos(radians(-160)), this.r * Math.sin(radians(-160)));
    vertex(this.r * Math.cos(radians(160)), this.r * Math.sin(radians(160)));
    endShape();
    pop();
  }

  showTarget() {
    const closest = this.findClosestEvader(evaders);
    if (closest) {
      push();
      noFill();
      stroke(this.colour);
      line(this.pos.x, this.pos.y, closest.pos.x, closest.pos.y);
      pop();
    }
  }
}
