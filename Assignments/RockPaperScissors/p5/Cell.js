class Cell {
  pos = [0, 0];
  size = [0, 0];
  state = "rock"; // 현재 상태 (rock, paper, scissors 중 하나)
  neighbors = [null, null, null, null, null, null, null, null]; // 8방향 이웃들 (위, 왼쪽, 오른쪽, 아래 등)
  nextState = "rock";

  // static rule: 가위바위보 규칙을 적용하는 정적 메서드
  static rule(neightbors, currentState) {
    // 랜덤한 이웃을 선택
    const randomNeighbor = () => {
      // null이 아닌 이웃들만 필터링
      const existingNeighbors = neightbors.filter((neighbor) => neighbor);
      // 랜덤 인덱스
      const randomIdx = Math.floor(random(existingNeighbors.length));
      // 랜덤 이웃 반환
      return existingNeighbors[randomIdx];
    };
    // 포식자(이기는 상태) 확인
    // rock은 paper에게 짐, paper는 scissors에게 짐, scissors는 rock에게 짐
    const isPredetor =
      currentState === "rock"
        ? randomNeighbor().state === "paper"
        : currentState === "paper"
        ? randomNeighbor().state === "scissors"
        : randomNeighbor().state === "rock";
    // 포식자가 있으면 그 상태로 변경, 없으면 현재 상태 유지
    if (isPredetor) {
      return randomNeighbor().state;
    }
    return currentState;
  }

  // 생성자: 셀 생성 시 위치, 크기, 초기 상태 설정
  constructor(pos, size, state = "rock") {
    this.pos = pos;
    this.size = size;
    this.state = state;
  }

  // 이웃 셀들을 설정
  setNeighbors(neighbors) {
    this.neighbors = neighbors;
  }

  // 다음 세대의 상태 계산
  computeNextState() {
    this.nextState = Cell.rule(this.neighbors, this.state);
  }

  // 계산된 다음 상태를 현재 상태로 업데이트
  updateState() {
    this.state = this.nextState;
  }

  // 셀 상태를 순환적으로 변경 (rock → paper → scissors → rock)
  toggleState() {
    this.state =
      this.state === "rock"
        ? "paper"
        : this.state === "paper"
        ? "scissors"
        : "rock";
  }

  // 마우스가 이 셀 위에 있는지 확인
  isHovered(mouseX, mouseY) {
    return (
      mouseX >= this.pos[0] &&
      mouseX < this.pos[0] + this.size[0] &&
      mouseY >= this.pos[1] &&
      mouseY < this.pos[1] + this.size[1]
    );
  }

  // 셀을 화면에 그리기
  render(isHovered = false) {
    // 테두리 설정
    noFill();
    if (isHovered) {
      stroke("black"); // 마우스가 올라간 경우 검은색 테두리
    } else {
      stroke("lightgray"); // 기본 회색 테두리
    }
    rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);

    // 셀 내부 색상 설정
    noStroke();
    if (this.state === "rock") {
      fill("#ED3F27"); // 빨강
    } else if (this.state === "paper") {
      fill("#FEB21A"); // 주황
    } else {
      fill("#134686"); // 파랑
    }
    // 셀 채우기
    rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
  }
}
