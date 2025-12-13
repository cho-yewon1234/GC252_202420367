// let balls = [];

// function setup() {
//   createCanvas(600, 400);

//   balls.push(new Ball(0.5 * width, 0.5 * height, 100, 7, pallete[0]));
//   balls.push(new Ball(0.5 * width, 0.5 * height, 50, 10, pallete[1]));
//   balls.push(new Ball(0.5 * width, 0.5 * height, 200, 3, pallete[2]));
//   balls.push(new Ball(0.5 * width, 0.5 * height, 150, 2, pallete[3]));
//   for (let n = 0; n < 20; n++) {
//     balls.push(
//       new Ball(0.5 * width, 0.5 * height, 50, 3, pallete[n % pallete.length])
//     );
//   }
// }
let pallete = ["#2ecc71", "#134686", "#FEB21A"];

const backColour = "#222222";
//보일때
const seeColour = {
  h: pallete[0],
  m: pallete[1],
  s: pallete[2],
};
//안보일때
const NoSeeColours = {
  h: backColour,
  m: backColour,
  s: backColour,
};
//공개수
const hourCount = 12;
const minCount = 60;
const secCount = 60;

let balls = [];

function setup() {
  createCanvas(700, 800);

  // 공 생성
  // 무작위 위치 지름 속도 꺼진색
  for (let n = 0; n < hourCount; n++) {
    balls.push(new Ball(random(width), random(height), 100, 2, NoSeeColours.h));
  }
  //  분
  for (let n = 0; n < minCount; n++) {
    balls.push(new Ball(random(width), random(height), 60, 3, NoSeeColours.m));
  }
  // 3. 초
  for (let n = 0; n < secCount; n++) {
    balls.push(new Ball(random(width), random(height), 25, 5, NoSeeColours.s));
  }
}

function draw() {
  background(backColour);
  //시간 가져오기
  let h = hour() % 12;
  if (h === 0) {
    h = h + 12;
  }
  let m = minute();
  let s = second();
  // 모든 공을 하나씩 검사
  balls.forEach((aBall, idx) => {
    //색 켜지고 꺼지고
    //시 공들이라면?
    //현재 시간보다 작으면 켜지고 아니면 꺼짐
    //분은 앞의 12개 건너뛰고 세어야함
    if (idx < hourCount) {
      if (idx < h) aBall.colour = seeColour.h;
      else aBall.colour = NoSeeColours.h;
    } else if (idx < hourCount + minCount) {
      if (idx - hourCount < m) aBall.colour = seeColour.m;
      else aBall.colour = NoSeeColours.m;
    } else {
      if (idx - (hourCount + minCount) < s) aBall.colour = seeColour.s;
      else aBall.colour = NoSeeColours.s;
    }
    //공 움직이기
    aBall.update();
    aBall.resolveWallCollision();
    aBall.show();
  });

  fill("black");
  noStroke();
  circle(mouseX, mouseY, 50);
}
//누르면 다시 생성...
function mousePressed() {
  // createBall();
  for (let idx = balls.length - 1; idx >= 0; idx--) {
    if (balls[idx].isHovered()) {
      balls.splice(idx, 1);
    }
  }
}

// function createBall() {
//   let dist = [mouseX, width - mouseX, mouseY, height - mouseY];
//   let minDist = min(dist);
//   let randomDiameter = random(2 * minDist);
//   if (randomDiameter > 100) randomDiameter = 100;
//   let randomSpeed = random(3, 10);
//   balls.push(
//     new Ball(
//       mouseX,
//       mouseY,
//       randomDiameter,
//       randomSpeed,
//       pallete[balls.length % pallete.length]
//     )
//   );
// }
