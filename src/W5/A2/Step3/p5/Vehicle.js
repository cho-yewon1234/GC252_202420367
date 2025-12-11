class Vehicle {
  constructor(x, y, msg, maxSpeed = 5, maxForce = 0.1) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 4; // 붓 크기
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;

    // ★ 핵심: 내 지나온 길을 기억하는 배열 (이름 맘대로 가능)
    this.history = [];
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // ★ 현재 위치를 복사해서 기억 목록에 저장
    // (copy()를 안 쓰면 모든 기억이 현재 위치로 덮어씌워짐)
    this.history.push(this.pos.copy());

    // 기억이 너무 많으면(50개 넘으면) 오래된 건 까먹기 (삭제)
    // 숫자를 늘리면 꼬리가 더 길어집니다.
    if (this.history.length > 50) {
      this.history.shift();
    }
  }

  seek(target) {
    const desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    const steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxForce);
    this.applyForce(steering);
  }

  separate(allVehicles) {
    const sum = createVector(0, 0);
    let count = 0;
    allVehicles.forEach((aVehicle) => {
      if (aVehicle !== this) {
        const dist = p5.Vector.dist(this.pos, aVehicle.pos);
        if (dist > 0 && dist < 20) {
          const towardMe = p5.Vector.sub(this.pos, aVehicle.pos);
          towardMe.div(dist);
          sum.add(towardMe);
          count++;
        }
      }
    });
    if (count > 0) {
      sum.div(count);
      sum.setMag(this.maxSpeed);
      const steering = p5.Vector.sub(sum, this.vel);
      steering.limit(this.maxForce);
      this.applyForce(steering.mult(2.0));
    }
  }

  // 화면 밖으로 나가도 꼬리가 자연스럽게 보이도록 wrap 기능은 뺍니다.
  wrapCoordinates() {
    // 비워둠
  }

  // ★ 꼬리(그림) 그리기
  show() {
    // 꼬리 그리기
    noFill();
    strokeWeight(2);

    beginShape();
    for (let i = 0; i < this.history.length; i++) {
      let pos = this.history[i];
      vertex(pos.x, pos.y);
    }
    endShape();

    // 붓의 머리 부분 (점)
    noStroke();
    // 머리 색상은 main.js에서 fill()로 정해준 색을 따라감
    circle(this.pos.x, this.pos.y, this.r * 2);
  }
}
