class Evader {
  constructor(x, y, options) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(2, 4));
    this.acc = createVector(0, 0);
    this.r = options?.r || 20;
    this.colour = options?.colour || "#FFD93D";
    this.maxSpeed = options?.maxSpeed || 4;
    this.maxForce = options?.maxForce || 0.1;
  }

  findClosestPursuer(pursuers) {
    let closest = null;
    let minDist = Infinity;
    for (const p of pursuers) {
      const d = this.pos.dist(p.pos);
      if (d < minDist) {
        minDist = d;
        closest = p;
      }
    }
    return closest;
  }

  separate(pursuers) {
    for (const p of pursuers) {
      if (p !== this) {
        const d = this.pos.dist(p.pos);
        const sum = createVector(0, 0);
        if (d > 0 && d < this.r * 3) {
          const towardMe = p5.Vector.sub(this.pos, p.pos);
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
  // 속도와 위치
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
  // 목표로 향함
  seek(target) {
    const desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    const steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }
  // 목표에서 도망가기
  flee(target) {
    const desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    desired.mult(-1);
    const steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }
  // 추적자 예측 후 도망
  evade(pursuers, prediction = 30) {
    const closest = this.findClosestPursuer(pursuers);
    if (!closest) return;
    const predictedVel = p5.Vector.mult(closest.vel, prediction);
    const predictedPos = p5.Vector.add(closest.pos, predictedVel);
    this.flee(predictedPos);
  }

  wrapCoordinates() {
    const margin = 70; // 작은 마진
    if (this.pos.x > width + margin) this.pos.x = -margin;
    if (this.pos.x < -margin) this.pos.x = width + margin;
    if (this.pos.y > height + margin) this.pos.y = -margin;
    if (this.pos.y < -margin) this.pos.y = height + margin;
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
}
