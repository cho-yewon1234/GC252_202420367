class Vehicle {
  constructor(x, y, maxSpeed = 5, maxForce = 0.1) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 25;
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
  }
  // 가속도, 속도, 위치 업데이트 및 리셋
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
  // 타겟으로부터 달아나기
  flee(target) {
    const desired = p5.Vector.sub(this.pos, target);
    desired.setMag(this.maxSpeed);

    const steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);

    this.applyForce(steer);
  }
  // 경계를 넘어가면 반대편으로
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
    fill(255);
    beginShape();
    vertex(0, 0);
    vertex(this.r * Math.cos(radians(-160)), this.r * Math.sin(radians(-160)));
    vertex(this.r * Math.cos(radians(160)), this.r * Math.sin(radians(160)));
    endShape();
    pop();
  }
}
