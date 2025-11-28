class Cell {
  pos = [0, 0]; // 셀의 위치 [x, y]
  size = [0, 0]; // 셀의 크기 [width, height]
  state = "rock"; // 현재 상태 ('rock', 'paper', 'scissors')
  neighbors = [null, null, null, null, null, null, null, null]; // 주변 8개 셀
  nextState = "rock"; // 다음 프레임에 적용될 상태

  // 가위바위보 규칙을 적용하는 정적 메서드
  static rule(neightbors, currentState) {
    // 존재하는 이웃 중 랜덤으로 하나를 선택하는 함수
    const randomNeighbor = () => {
      const existingNeighbors = neightbors.filter((neighbor) => neighbor);
      const randomIdx = Math.floor(random(existingNeighbors.length));
      return existingNeighbors[randomIdx];
    };

    // 현재 상태를 이길 수 있는 포식자가 이웃에 있는지 확인
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

  // 생성자: 위치, 크기, 초기 상태를 설정
  constructor(pos, size, state = "rock") {
    this.pos = pos;
    this.size = size;
    this.state = state;
  }

  // 이웃 셀들을 설정
  setNeighbors(neighbors) {
    this.neighbors = neighbors;
  }

  // 다음 상태를 계산 (실제 적용은 updateState에서)
  computeNextState() {
    this.nextState = Cell.rule(this.neighbors, this.state);
  }

  // 계산된 다음 상태를 현재 상태로 업데이트
  updateState() {
    this.state = this.nextState;
  }

  // 마우스 클릭 시 상태를 순환 (rock → paper → scissors → rock)
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
    // 테두리 그리기 (호버 시 검은색, 아니면 연한 회색)
    noFill();
    if (isHovered) {
      stroke("black");
    } else {
      stroke("lightgray");
    }
    rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);

    // 상태에 따른 색상으로 셀 채우기
    noStroke();
    if (this.state === "rock") {
      fill("#ED3F27"); // 빨간색
    } else if (this.state === "paper") {
      fill("#FEB21A"); // 노란색
    } else {
      fill("#134686"); // 파란색
    }
    // ellipse(
    //   this.pos[0] + this.size[0] * 0.5,
    //   this.pos[1] + this.size[1] * 0.5,
    //   this.size[0] * 0.8,
    //   this.size[1] * 0.8
    // );

    // 원형 대신 사각형으로 채우기 (주석 처리된 ellipse는 원형 옵션)
    rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
  }
}
