class Tile {
  pos = [0, 0]; //타일의 크기
  size = [1, 1]; //이웃 타일
  neighbors = [null, null, null, null]; // top, left, bottom, right
  state = false; // 이웃 상태 조합으로 계산되는 이미지 인덱스
  binaryState = "0000";
  tileImgIdx = 0;

  // x, y: 위치 / w, h: 크기 / state: 초기 on/off 상태
  constructor(x, y, w, h, state = false) {
    this.pos[0] = x;
    this.pos[1] = y;
    this.size[0] = w;
    this.size[1] = h;
    this.state = state;
  }

  // 이웃 타일들을 한 번에 등록하는 함수
  setNeighbor(t, l, b, r) {
    this.neighbors[0] = t;
    this.neighbors[1] = l;
    this.neighbors[2] = b;
    this.neighbors[3] = r;
  }

  computeStates() {
    let binaryString = "";
    this.neighbors.forEach((aNeighbor) => {
      binaryString += aNeighbor?.state ? "1" : "0";
    });
    this.binaryState = binaryString;
    this.tileImgIdx = parseInt(binaryString, 2);
  }

  // 마우스(x,y)가 이 타일 위에 올라와 있는지 확인
  isHovered(mx, my) {
    return (
      mx >= this.pos[0] &&
      mx <= this.pos[0] + this.size[0] &&
      my >= this.pos[1] &&
      my <= this.pos[1] + this.size[1]
    );
  }
  toggleState() {
    this.state = !this.state;
  }
  //추가
  // 타일을 실제로 그리는 함수
  render(tiles) {
    const [x, y] = this.pos;
    const [w, h] = this.size;
    const cx = x + w / 2;
    const cy = y + h / 2;

    // push();
    // translate(cx, cy);
    // if (this.state) {
    //   circle(0, 0, Math.min(w, h));
    // }
    // pop();

    // state가 true일 때만 타일 이미지를 그림
    // tileImgIdx에 따라 다른 이미지를 선택해서 출력
    //if구문 추가하면 타일 그려짐
    if (this.state) {
      image(
        tiles[this.tileImgIdx],
        this.pos[0],
        this.pos[1],
        this.size[0],
        this.size[1]
      );
    }
    push();
    translate(cx, cy);
    noStroke();
    if (this.state) {
      fill("white");
      circle(0, 0, w / 4);
    }
    fill("red");
    textAlign(CENTER, CENTER);
    textSize(16);
    text(this.binaryState.charAt(0), 0, -h / 2);
    text(this.binaryState.charAt(1), -w / 3, 0);
    text(this.binaryState.charAt(2), 0, h / 2);
    text(this.binaryState.charAt(3), w / 2, 0);
    pop();
  }
}
