class Point {
  constructor(x, y, thickness, options) {
    this.pos = createVector(x, y);
    this.r = options.r || 10;
    this.colour = options.colour || "#FFF";
    this.distConstraint = options.distConstraint || 50;
    this.heading = 0;
    this.thickness = thickness;
    this.angleConstraint = options.angleConstraint || [
      radians(150),
      radians(210),
    ];
  }

  setPos(pos) {
    this.pos.set(pos);
  }

  setHeading(heading) {
    this.heading = heading;
  }

  constrainedBy(other, isStrong = false) {
    const toMe = p5.Vector.sub(this.pos, other.pos);
    if (isStrong || toMe.mag() > other.distConstraint) {
      toMe.setMag(other.distConstraint);
      const newPos = p5.Vector.add(toMe, other.pos);
      this.pos.set(newPos);
      this.setHeading(toMe.mult(-1).heading());
    }
  }
  // 몸 우연하게 움직이기
  angleConstrainedBy(parent, grandParent) {
    const vecParentToMe = p5.Vector.sub(this.pos, parent.pos);
    const vecParentToGrandparent = p5.Vector.sub(grandParent.pos, parent.pos);
    let angle = p5.Vector.angleBetween(vecParentToMe, vecParentToGrandparent);
    angle = angle < 0 ? angle + 2 * Math.PI : angle;
    let [minAngle, maxAngle] = this.angleConstraint;
    if (minAngle < 0) minAngle += 2 * Math.PI;
    if (maxAngle < 0) maxAngle += 2 * Math.PI;
    if (angle < minAngle || angle > maxAngle) {
      const rotAngle = angle < minAngle ? -minAngle : -maxAngle;
      vecParentToGrandparent.rotate(rotAngle);
      const newPos = p5.Vector.add(vecParentToGrandparent, parent.pos);
      this.setPos(newPos);
      const tempVec = vecParentToGrandparent.copy();
      tempVec.mult(-1);
      this.setHeading(tempVec.heading());
    }
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading);
    noStroke();
    fill(this.colour);
    beginShape();
    vertex(this.r, 0);
    vertex(0, this.r);
    vertex(-this.r, 0);
    vertex(0, -this.r);
    endShape(CLOSE);
    arc(0, 0, 2 * this.r, 2 * this.r, radians(90), radians(270));
    pop();
  }

  showDistConstraint() {
    push();
    translate(this.pos.x, this.pos.y);
    noFill();
    stroke(this.colour);
    circle(0, 0, 2 * this.distConstraint);
    pop();
  }

  showThickness() {
    push();
    translate(this.pos.x, this.pos.y);
    noFill();
    stroke("#FFF");
    circle(0, 0, this.thickness);
    pop();
  }

  getPointOnThickness(angle, offset = 0, multiplier = 1) {
    const pointPos = p5.Vector.fromAngle(this.heading + angle);
    pointPos.setMag(multiplier * 0.5 * this.thickness + offset);
    pointPos.add(this.pos);
    return pointPos;
  }
}
