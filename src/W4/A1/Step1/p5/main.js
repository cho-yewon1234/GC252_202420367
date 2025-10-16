let x, y;
const diameter = 100;
const speed = 5;
let velX, velY;
const gravity = 0.1;
const restitution = 0.9;

function setup() {
  createCanvas(700, 800);
  init();
}

function init() {
  x = width / 2;
  y = height / 2;
  const randomAngle = Math.random() * 360;
  velX = speed * cos(radians(randomAngle));
  velY = speed * sin(radians(randomAngle));
}

function draw() {
  background(0);

  // 중력 적용 = 속도에 가속도(중력) 더하기
  velY += gravity;

  // 원 위치 업데이트
  x += velX;
  y += velY;

  // 벽 충돌 처리
  if (x < diameter / 2 || x > width - diameter / 2) {
    // if (x < diameter / 2) {
    //   x = diameter / 2;
    // } else {
    //   x = width - diameter / 2;
    // }
    x = x < diameter / 2 ? diameter / 2 : width - diameter / 2;
    velX *= -restitution;
  }
  if (y < diameter / 2 || y > height - diameter / 2) {
    y = y < diameter / 2 ? diameter / 2 : height - diameter / 2;
    velY *= -restitution;
  }

  // 원 그리기
  noStroke();
  fill("skyblue");
  circle(x, y, diameter);

  // // vel 표현
  // stroke("white");
  // line(width / 2, height / 2, width / 2 + velX * 10, height / 2 + velY * 10);
  // stroke("red");
  // line(width / 2, height / 2, width / 2 + velX * 10, height / 2);
  // stroke("green");
  // line(width / 2, height / 2, width / 2, height / 2 + velY * 10);

  // vel 표현
  stroke("white");
  line(x, y, x + velX * 10, y + velY * 10);
  stroke("red");
  line(x, y, x + velX * 10, y);
  stroke("green");
  line(x, y, x, y + velY * 10);
}

function mousePressed() {
  init();
}
