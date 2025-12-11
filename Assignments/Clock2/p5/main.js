const seekers = [];
const fleers = [];
const seed = 0;

function setup() {
  createCanvas(800, 600);
  angleMode(DEGREES);
  randomSeed(seed);

  // 쫒아가기 10개 분침 쫒기
  //랜덤한 위치에  만들기
  for (let n = 0; n < 10; n++) {
    seekers.push(new Seeker(random(width), random(height), 4, 0.1));
  }
  // 도망가기  5개  초침 피하기
  for (let n = 0; n < 5; n++) {
    fleers.push(new Fleer(random(width), random(height), 5, 0.2));
  }
}

function draw() {
  background(0);

  let cx = width / 2;
  let cy = height / 2;

  // 현재 시간 가져오기
  let h = hour();
  let m = minute();
  let s = second();

  //  12시간제 변환
  let h12 = h % 12;
  if (h12 === 0) {
    h12 = 12;
  }

  //1시간당 30도
  let hourAngle = (h % 12) * 30 - 90;

  // 시침 끝 위치
  let hourTarget = createVector(
    cx + cos(hourAngle) * 150,
    cy + sin(hourAngle) * 150
  );
  //분침 각도 위치 계산
  let minAngle = m * 6 - 90;
  let minTarget = createVector(
    cx + cos(minAngle) * 200,
    cy + sin(minAngle) * 200
  );

  //  초침 각도 위치 계산
  let secAngle = s * 6 - 90;
  let secTarget = createVector(
    cx + cos(secAngle) * 250,
    cy + sin(secAngle) * 250
  );
  //분침 ,초침 같이 움직이게  쫒기고 도망가는거 같이
  if (mouseIsPressed) {
    minTarget.set(mouseX, mouseY);
    secTarget.set(mouseX, mouseY);
  }
  //시침
  stroke(255);
  strokeWeight(6);
  line(cx, cy, hourTarget.x, hourTarget.y);

  //분침
  stroke("#001BB7");
  strokeWeight(4);
  line(cx, cy, minTarget.x, minTarget.y);

  //초침
  stroke("#FFD93D");
  strokeWeight(2);
  line(cx, cy, secTarget.x, secTarget.y);

  //분침을 향해 가게
  for (let v of seekers) {
    v.seek(minTarget);
    v.update();
    v.show();
  }
  //시침으로부터 도망가게
  for (let v of fleers) {
    v.flee(secTarget);
    v.update();
    v.wrapCoordinates();
    v.show();
  }

  fill(255);
  circle(cx, cy, 10);
}
