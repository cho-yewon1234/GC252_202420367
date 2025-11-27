class Cell {
  // 셀의 위치 [x, y]
  pos = [0, 0];
  // 셀의 크기 [너비, 높이]
  size = [0, 0];
  // 현재 상태 ('rock', 'paper', 'scissors')
  state = "rock";
  // 다음 프레임의 상태
  nextState = "rock";
  // 8명의 이웃들을 저장하는 배열 (상하좌우 + 대각선)
  neighbors = [];

  // 생성자: 위치, 크기, 초기 상태를 받아서 셀을 만듦
  constructor(pos, size, state = "rock") {
    this.pos = pos;
    this.size = size;
    this.state = state;
    this.nextState = state;
  }

  // 이웃 셀들을 설정 (null인 것은 제외)
  setNeighbors(neighbors) {
    this.neighbors = neighbors.filter((n) => n !== null);
  }

  // 다음 상태를 계산: 랜덤으로 이웃 한 명을 골라서 가위바위보
  computeNextState() {
    // 이웃이 없으면 그냥 리턴
    if (this.neighbors.length === 0) return;

    // 이웃 중에서 랜덤으로 한 명 선택
    const randomNeighbor =
      this.neighbors[Math.floor(Math.random() * this.neighbors.length)];

    // 선택한 이웃이 나를 이기면 그 상태로 변경
    if (this.loses(randomNeighbor.state)) {
      this.nextState = randomNeighbor.state;
    }
  }

  // 가위바위보 규칙: 내가 상대방한테 지는지 체크
  loses(opponentState) {
    if (this.state === "rock" && opponentState === "paper") return true; // 바위 < 보
    if (this.state === "paper" && opponentState === "scissors") return true; // 보 < 가위
    if (this.state === "scissors" && opponentState === "rock") return true; // 가위 < 바위
    return false;
  }

  // 계산된 다음 상태를 실제로 적용
  updateState() {
    this.state = this.nextState;
  }

  // 마우스가 이 셀 위에 있는지 체크
  isHovered(mX, mY) {
    return (
      mX >= this.pos[0] &&
      mX <= this.pos[0] + this.size[0] &&
      mY >= this.pos[1] &&
      mY <= this.pos[1] + this.size[1]
    );
  }

  // 클릭했을 때 상태를 순환 (rock → paper → scissors → rock)
  toggleState() {
    if (this.state === "rock") {
      this.state = "paper";
    } else if (this.state === "paper") {
      this.state = "scissors";
    } else {
      this.state = "rock";
    }
    this.nextState = this.state;
  }

  // 화면에 셀을 그림
  render(isHovered = false) {
    strokeWeight(1);
    // 마우스 올리면 흰색 테두리, 아니면 회색 테두리
    stroke(isHovered ? "white" : 200);

    // 상태에 따라 색상 설정
    if (this.state === "rock") {
      fill("#ED3F27"); // 빨강
    } else if (this.state === "paper") {
      fill("#FEB21A"); // 주황
    } else {
      fill("#134686"); // 파랑
    }

    rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
  }
}
