let pallete = ["#2ecc71", "#134686", "#FEB21A"];

const backColour = "#222222";
const seeColour = {
  h: pallete[0], // 시 공 색상
  m: pallete[1], // 분 공 색상
  s: pallete[2], // 초 공 색상
};
const NoSeeColours = {
  h: backColour,
  m: backColour,
  s: backColour,
};

const hourCount = 12; // 시 공 개수: 12개
const minCount = 60; // 분 공 개수: 60개
const secCount = 60; // 초 공 개수: 60개

let balls = []; // 모든 공을 담는 배열
let secBallInitialized = []; // 초 공 초기화 상태 추적 배열
function setup() {
  createCanvas(700, 800); // 700x800 캔버스 생성

  // 시 공 12개 생성
  for (let n = 0; n < hourCount; n++) {
    balls.push(new HourBall(random(width), random(height), n + 1));
  }

  // 분 공 60개 생성
  for (let n = 0; n < minCount; n++) {
    balls.push(new MinBall(random(width), random(height)));
  }

  // 초 공 60개 생성
  for (let n = 0; n < secCount; n++) {
    balls.push(new SecBall(-100, -100, n)); // 처음엔 화면 밖에 숨김
    secBallInitialized.push(false); // 초기화 상태는 false
  }
}

function draw() {
  background(backColour); // 배경색으로 화면 지우기

  // 현재 시간 가져오기
  let h = hour() % 12; // 12시간 형식으로 변환
  if (h === 0) h = h + 12; // 0시를 12시로 변경
  let m = minute(); // 현재 분
  let s = second(); // 현재 초

  const MIN_BALL_START = hourCount; // 분 공 시작 인덱스: 12
  const SEC_BALL_START = hourCount + minCount; // 초 공 시작 인덱스: 72

  // 시 공에 마우스가 호버되었는지 확인
  let hourBallHovered = false;
  for (let n = 0; n < MIN_BALL_START; n++) {
    if (balls[n].isHovered()) {
      hourBallHovered = true;
      break; // 하나라도 호버되면 루프 종료
    }
  }

  // 호버 중일 때만 시 공들을 선으로 연결
  if (hourBallHovered) {
    stroke("#333333"); // 선 색상: 회색
    strokeWeight(2); // 선 두께: 2px
    noFill();

    //
    for (let n = 0; n < h - 1; n++) {
      const ballA = balls[n]; //
      const ballB = balls[n + 1]; //
      line(ballA.posX, ballA.posY, ballB.posX, ballB.posY); // 두 공을 선으로 연결
    }
  }

  // 모든 공 업데이트
  for (let idx = 0; idx < balls.length; idx++) {
    let aBall = balls[idx];

    stroke(seeColour.h); // 기본 stroke 설정
    strokeWeight(1);
    noFill();
    //시
    if (idx < MIN_BALL_START) {
      // 현재 시간 이하면 켜기, 아니면 끄기
      if (aBall.seeHour <= h) aBall.colour = seeColour.h;
      else aBall.colour = NoSeeColours.h;
      aBall.resolveWallCollision(); // 벽 충돌 처리
    }

    // 분
    else if (idx < SEC_BALL_START) {
      const minuteIndex = idx - MIN_BALL_START; // 분 인덱스 (0~59)
      const seeMinute = minuteIndex < m; // 현재 분보다 작으면 켜기

      if (seeMinute) {
        aBall.colour = seeColour.m; // 켜진 색
        aBall.speed = 3; // 속도 설정
        aBall.resolveWallCollision(); // 벽 충돌 처리

        // 켜진 모든 분 공들끼리 충돌 처리
        for (let j = idx + 1; j < SEC_BALL_START; j++) {
          aBall.resolveBallCollision(balls[j]);
        }
      } else {
        aBall.colour = NoSeeColours.m; // 꺼진 색
        aBall.speed = 0; // 멈춤
      }
    } else {
      const secIndex = idx - SEC_BALL_START; // 초 인덱스 (0~59)

      // 0~29초: 진입 공이 하나씩 들어옴
      if (s < 30) {
        const isTarget = secIndex <= s; // 현재 초 이하면 활성화

        if (isTarget) aBall.colour = seeColour.s;
        else aBall.colour = NoSeeColours.s;

        if (isTarget) {
          // 처음 등장할 때만 위치와 속도 초기화
          if (!secBallInitialized[secIndex]) {
            let out = int(random(4)); // 0~3 중 랜덤 (4방향)

            if (out === 0) {
              // 위쪽에서 들어옴
              aBall.posX = random(width);
              aBall.posY = -50;
              aBall.velX = random(-100, 100); // 좌우 랜덤
              aBall.velY = random(150, 200); // 아래로
            } else if (out === 1) {
              // 오른쪽에서 들어옴
              aBall.posX = width + 50;
              aBall.posY = random(height);
              aBall.velX = random(-200, -150); // 왼쪽으로
              aBall.velY = random(-100, 100); // 상하 랜덤
            } else if (out === 2) {
              // 아래쪽에서 들어옴
              aBall.posX = random(width);
              aBall.posY = height + 50;
              aBall.velX = random(-100, 100); // 좌우 랜덤
              aBall.velY = random(-200, -150); // 위로
            } else {
              // 왼쪽에서 들어옴
              aBall.posX = -50;
              aBall.posY = random(height);
              aBall.velX = random(150, 200); // 오른쪽으로
              aBall.velY = random(-100, 100); // 상하 랜덤
            }
            aBall.speed = 100;
            secBallInitialized[secIndex] = true;
          }

          aBall.resolveWallCollision(); // 벽에 갇히도록 충돌 처리
        } else {
          // 아직 안 들어온 공 화면 밖에 숨김
          aBall.posX = -100;
          aBall.posY = -100;
          aBall.velX = 0;
          aBall.velY = 0;
          secBallInitialized[secIndex] = false;
        }
      }
      // 30~59초 공 나가기
      else {
        const remainingCount = 60 - s; // 남아있어야 할 공 개수

        // 남아있어야 할 공들
        if (secIndex < remainingCount) {
          aBall.colour = seeColour.s;
          aBall.resolveWallCollision(); // 벽에 갇힘
        }
        // 밖으로 나가는 공들
        else if (secIndex < 30) {
          aBall.colour = seeColour.s; // 색은 유지
          // 벽 충돌 처리 안 함 → 밖으로 나감
        }
        // 완전히 사라진 공들 (30번 이상)
        else {
          aBall.colour = NoSeeColours.s;
          aBall.posX = -100;
          aBall.posY = -100;
          aBall.velX = 0;
          aBall.velY = 0;
        }
      }
    }

    aBall.update(); // 위치 업데이트
    aBall.show(); // 화면에 그리기
  }

  // 마우스 커서 대신 검은 원 그리기
  fill("black");
  noStroke();
  circle(mouseX, mouseY, 50);
}
