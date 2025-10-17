class Animal {
  constructor(x, y, distConstraint, thickness = [40, 30]) {
    this.spine = [];
    this.head = null;
    this.tail = null;
    push();
    colorMode(HSB, 360, 100, 100);
    for (let idx = 0; idx < thickness.length; idx++) {
      const posX = x;
      const posY = y + distConstraint * idx;
      const hue = map(idx, 0, thickness.length - 1, 0, 240);
      const colour = color(hue, 100, 100);
      const options = {
        colour: colour,
        distConstraint: distConstraint,
      };
      const newPoint = new Point(posX, posY, thickness[idx], options);
      if (idx === 0) {
        this.head = newPoint;
      }
      this.spine.push(newPoint);
    }
    pop();
    this.tail = this.spine[this.spine.length - 1];
    this.headPoints = [];
    this.cwPoints = [];
    this.tailPoints = [];
    this.ccwPoints = [];
    this.bodyPoints = [];
  }

  setHeadPos(pos) {
    this.head.setPos(pos);
  }

  update() {
    this.spine.forEach((aPoint, idx) => {
      if (idx > 0) {
        aPoint.constrainedBy(this.spine[idx - 1], true);
      }
    });
    this.head.setHeading(this.spine[1].heading);

    this.spine.forEach((aPoint, idx) => {
      this.cwPoints[idx] = aPoint.getPointOnThickness(radians(90));
      this.ccwPoints[this.spine.length - 1 - idx] = aPoint.getPointOnThickness(
        radians(-90)
      );
    });

    this.headPoints[0] = this.head.getPointOnThickness(radians(-60));
    this.headPoints[1] = this.head.getPointOnThickness(radians(-30));
    this.headPoints[2] = this.head.getPointOnThickness(radians(0));
    this.headPoints[3] = this.head.getPointOnThickness(radians(30));
    this.headPoints[4] = this.head.getPointOnThickness(radians(60));

    this.tailPoints[0] = this.tail.getPointOnThickness(radians(120));
    this.tailPoints[1] = this.tail.getPointOnThickness(radians(150));
    this.tailPoints[2] = this.tail.getPointOnThickness(radians(180));
    this.tailPoints[3] = this.tail.getPointOnThickness(radians(-150));
    this.tailPoints[4] = this.tail.getPointOnThickness(radians(-120));

    let bodyPointsIdx = 0;
    const headCenterIdx = Math.floor(0.5 * this.headPoints.length);
    for (
      let idx = headCenterIdx - 1;
      idx <= this.headPoints.length - 1;
      idx++
    ) {
      this.bodyPoints[bodyPointsIdx] = this.headPoints[idx];
      bodyPointsIdx++;
    }
    this.cwPoints.forEach((p) => {
      this.bodyPoints[bodyPointsIdx] = p;
      bodyPointsIdx++;
    });
    this.tailPoints.forEach((p) => {
      this.bodyPoints[bodyPointsIdx] = p;
      bodyPointsIdx++;
    });
    this.ccwPoints.forEach((p) => {
      this.bodyPoints[bodyPointsIdx] = p;
      bodyPointsIdx++;
    });
    for (let idx = 0; idx <= headCenterIdx + 1; idx++) {
      this.bodyPoints[bodyPointsIdx] = this.headPoints[idx];
      bodyPointsIdx++;
    }
  }

  showSpine() {
    this.spine.forEach((aPoint) => {
      aPoint.show();
    });
  }

  showDistConstraint() {
    this.spine.forEach((aPoint) => {
      aPoint.showDistConstraint();
    });
  }

  showThickness() {
    this.spine.forEach((aPoint) => {
      aPoint.showThickness();
    });
  }

  showPtOnThicknessCW() {
    this.cwPoints.forEach((point) => {
      push();
      translate(point.x, point.y);
      noStroke();
      fill('#F00');
      circle(0, 0, 8);
      pop();
    });
  }

  showPtOnThicknessCCW() {
    this.ccwPoints.forEach((point) => {
      push();
      translate(point.x, point.y);
      noStroke();
      fill('#00F');
      circle(0, 0, 8);
      pop();
    });
  }

  showBodyShape() {
    push();
    noStroke();
    fill('#0F0');
    beginShape();
    this.bodyPoints.forEach((p) => {
      curveVertex(p.x, p.y);
    });
    endShape();
    pop();
  }

  showEyes() {
    const right = this.head.getPointOnThickness(radians(90), 0, 0.5);
    const left = this.head.getPointOnThickness(radians(-90), 0, 0.5);
    push();
    translate(right.x, right.y);
    rotate(this.head.heading);
    noStroke();
    fill('#000');
    circle(0, 0, 5);
    pop();
    push();
    translate(left.x, left.y);
    rotate(this.head.heading);
    noStroke();
    fill('#000');
    circle(0, 0, 5);
    pop();
  }
}
