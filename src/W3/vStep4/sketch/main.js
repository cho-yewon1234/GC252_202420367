// let aBall;
// let bBall;
// let cBall;
// let dBall;

let balls = [];

function setup() {
  createCanvas(600, 400);
  // aBall = new Ball(0.5 * width, 0.5 * height, 100, 7, 'red');
  // bBall = new Ball(0.5 * width, 0.5 * height, 75, 5, 'green');
  // cBall = new Ball(0.5 * width, 0.5 * height, 50, 3, 'blue');
  // dBall = new Ball(0.5 * width, 0.5 * height, 25, 1, 'black');
  balls.push(new Ball(0.5 * width, 0.5 * height, 75, 5, 'green'));
  balls.push(new Ball(0.5 * width, 0.5 * height, 50, 3, 'blue'));
  balls.push(new Ball(0.5 * width, 0.5 * height, 100, 7, 'red'));
  balls.push(new Ball(0.5 * width, 0.5 * height, 25, 1, 'black'));
}

function draw() {
  background(127);
  fill('black');
  noStroke();
  circle(mouseX, mouseY, 50);

  // aBall.update();
  // aBall.resolveWallCollision();
  // aBall.show();
  // bBall.update();
  // bBall.resolveWallCollision();
  // bBall.show();
  // cBall.update();
  // cBall.resolveWallCollision();
  // cBall.show();
  // dBall.update();
  // dBall.resolveWallCollision();
  // dBall.show();

  // for(let idx = 0; idx < balls.length; idx++){
  //   balls[idx].update()
  //   balls[idx].resolveWallCollision()
  //   balls[idx].show()
  // }

  balls.forEach((aBall) => {
    aBall.update();
    aBall.resolveWallCollision();
    aBall.show();
  });
}
function mousePressed() {
  // aBall.reset(mouseX, mouseY);

  balls.forEach((aBall) => {
    aBall.reset(0.5 * width, 0.5 * height);
  });
}
