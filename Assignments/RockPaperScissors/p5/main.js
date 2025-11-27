// HTML에서 캔버스를 넣을 컨테이너 가져오기
const canvasContainer = document.getElementById("canvas-container");

let cellSize; // 각 셀의 크기
const cellsPerRow = 100; // 한 줄에 100개의 셀
let cellsPerColumn; // 한 열에 들어갈 셀의 개수
const cells = []; // 모든 셀들을 저장하는 배열
let hoveredCell = null; // 현재 마우스가 올라간 셀

let flagStop = false; // 일시정지 플래그
const interval = 50; // 업데이트 간격 (밀리초)
let lastMs = 0; // 마지막 업데이트 시간

let gen = 0; // 세대 수

const seed = 1; // 랜덤 시드 (같은 초기 상태로 시작)

// p5.js 초기 설정
function setup() {
  // 600x700 캔버스 생성
  const renderer = createCanvas(600, 700);
  renderer.parent(canvasContainer);

  // 랜덤 시드 설정 (매번 같은 초기 상태)
  randomSeed(seed);

  // 셀 크기 계산
  cellSize = width / cellsPerRow;
  cellsPerColumn = cellsPerRow;

  // 모든 셀 생성
  for (let idx = 0; idx < cellsPerRow * cellsPerColumn; idx++) {
    const col = idx % cellsPerRow; // 열 번호
    const row = Math.floor(idx / cellsPerRow); // 행 번호
    const x = col * cellSize + 0.5 * width - 0.5 * cellsPerRow * cellSize; // x 위치 (중앙 정렬)
    const y = row * cellSize; // y 위치
    const rand = random();
    // 1/3 확률로 rock, paper, scissors 랜덤 배치
    const state = rand < 1 / 3 ? "rock" : rand < 2 / 3 ? "paper" : "scissors";
    cells.push(new Cell([x, y], [cellSize, cellSize], state));
  }

  // 각 셀의 이웃들을 연결
  cells.forEach((cell, idx) => {
    const row = Math.floor(idx / cellsPerRow);
    const col = idx % cellsPerRow;

    // 8방향 이웃 찾기 (위, 아래, 좌, 우, 대각선)
    const tl = row > 0 && col > 0 ? cells[idx - cellsPerRow - 1] : null; // 왼쪽 위
    const t = row > 0 ? cells[idx - cellsPerRow] : null; // 위
    const tr =
      row > 0 && col < cellsPerRow - 1 ? cells[idx - cellsPerRow + 1] : null; // 오른쪽 위
    const l = col > 0 ? cells[idx - 1] : null; // 왼쪽
    const r = col < cellsPerRow - 1 ? cells[idx + 1] : null; // 오른쪽
    const bl =
      row < cellsPerColumn - 1 && col > 0 ? cells[idx + cellsPerRow - 1] : null; // 왼쪽 아래
    const b = row < cellsPerColumn - 1 ? cells[idx + cellsPerRow] : null; // 아래
    const br =
      row < cellsPerColumn - 1 && col < cellsPerRow - 1
        ? cells[idx + cellsPerRow + 1]
        : null; // 오른쪽 아래

    const neighbors = [tl, t, tr, r, br, b, bl, l];
    cell.setNeighbors(neighbors);
  });
}

// 매 프레임마다 실행
function draw() {
  // 일시정지가 아니고, interval 시간이 지났으면 업데이트
  if (millis() - lastMs > interval && !flagStop) {
    lastMs = millis();
    // 1. 모든 셀의 다음 상태 계산
    cells.forEach((cell) => cell.computeNextState());
    // 2. 계산된 상태를 실제로 적용
    cells.forEach((cell) => cell.updateState());
    gen++; // 세대 증가
  }

  // 배경 회색으로
  background(220);

  // 모든 셀 그리기
  cells.forEach((cell) => cell.render(hoveredCell === cell));

  // 세대 수 표시
  fill("black");
  noStroke();
  textSize(16);
  textAlign(LEFT, TOP);
  text(`Generation: ${gen}`, 10, 10);

  // 각 상태의 개수 세기
  const rockCnt = cells.filter((cell) => cell.state === "rock").length;
  const paperCnt = cells.filter((cell) => cell.state === "paper").length;
  const scissorsCnt = cells.length - rockCnt - paperCnt;

  // 하단에 통계 바 그리기
  noStroke();
  // 빨강 바 (rock)
  fill("#ED3F27");
  rect(0, width, (width * rockCnt) / cells.length, 100);
  // 주황 바 (paper)
  fill("#FEB21A");
  rect(
    (width * rockCnt) / cells.length,
    width,
    (width * paperCnt) / cells.length,
    100
  );
  // 파랑 바 (scissors)
  fill("#134686");
  rect(
    (width * (rockCnt + paperCnt)) / cells.length,
    width,
    (width * scissorsCnt) / cells.length,
    100
  );

  // 퍼센트 텍스트 표시
  fill("black");
  noStroke();
  textSize(16);
  textAlign(CENTER, TOP);
  // rock 퍼센트
  text(
    `${((rockCnt / cells.length) * 100).toFixed(2)}%`,
    ((width * rockCnt) / cells.length) * 0.5,
    width + 50
  );
  // paper 퍼센트
  text(
    `${((paperCnt / cells.length) * 100).toFixed(2)}%`,
    ((width * paperCnt) / cells.length) * 0.5 +
      (width * rockCnt) / cells.length,
    width + 50
  );
  // scissors 퍼센트
  text(
    `${((scissorsCnt / cells.length) * 100).toFixed(2)}%`,
    ((width * scissorsCnt) / cells.length) * 0.5 +
      (width * (rockCnt + paperCnt)) / cells.length,
    width + 50
  );
}

// 마우스가 움직일 때: 어느 셀 위에 있는지 찾기
function mouseMoved() {
  hoveredCell = null;
  for (let idx = 0; idx < cells.length; idx++) {
    if (cells[idx].isHovered(mouseX, mouseY)) {
      hoveredCell = cells[idx];
      break;
    }
  }
}

// 마우스 클릭: 클릭한 셀의 상태 변경
function mousePressed() {
  if (hoveredCell) {
    hoveredCell.toggleState();
  }
}

// 키보드 입력
function keyPressed() {
  if (key === " ") {
    // 스페이스바: 일시정지/재개
    flagStop = !flagStop;
    lastMs = millis();
  } else if (key === "ArrowRight") {
    // 오른쪽 화살표: 일시정지 상태에서 한 스텝 진행
    if (!flagStop) return;
    cells.forEach((cell) => cell.computeNextState());
    cells.forEach((cell) => cell.updateState());
    gen++;
    lastMs = millis();
  } else if (key === "ArrowLeft") {
    // 왼쪽 화살표: 초기 상태로 리셋
    randomSeed(seed);
    for (let idx = 0; idx < cellsPerRow * cellsPerColumn; idx++) {
      const rand = random();
      const state = rand < 1 / 3 ? "rock" : rand < 2 / 3 ? "paper" : "scissors";
      cells[idx].state = state;
      cells[idx].nextState = state;
    }
    gen = 0;
  }
}
