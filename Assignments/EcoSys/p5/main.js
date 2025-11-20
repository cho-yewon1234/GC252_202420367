const prey = [];
const predators = [];

function setup() {
  createCanvas(1000, 600);

  // 물고기 10마리
  for (let i = 0; i < 10; i++) {
    const x = random(width);
    const y = random(height);

    const evader = new Evader(x, y, {
      maxSpeed: 4,
      maxForce: 0.1,
    });
    // 물고기 몸통
    const body = new Fish1(
      x,
      y,
      4,
      [radians(170), radians(190)],
      [30, 40, 50, 58, 60, 58, 50, 35, 22, 12, 6, 3, 15, 25, 30]
    );

    prey.push({ evader, body });
  }

  // 뱀장어 2마리
  for (let i = 0; i < 2; i++) {
    const x = random(width);
    const y = random(height);

    const pursuer = new Pursuer(x, y, {
      maxSpeed: 3,
      maxForce: 0.05,
    });
    // 뱀장어 몸통
    const body = new Fish2(
      x,
      y,
      8,
      [radians(170), radians(190)],

      [
        12, 14, 16, 18, 20, 22, 24, 26, 27, 28, 28, 28, 27, 26, 25, 24, 23, 22,
        21, 20, 18, 16, 14, 12, 11, 10, 9, 7, 5, 4,
      ]
    );

    predators.push({ pursuer, body });
  }
}

function draw() {
  background("#0046FF");
  //행동 객체만 추출
  const predatorList = predators.map((p) => p.pursuer);
  const preyList = prey.map((p) => p.evader);
  //물고기 업데이트
  for (const fish of prey) {
    fish.evader.evade(predatorList);
    fish.evader.separate(preyList);
    fish.evader.update();
    fish.evader.wrapCoordinates();
    //행동 계산
    fish.body.setHeadPos(fish.evader.pos);
    fish.body.update();
    fish.body.showBodyShape();
    fish.body.showEyes();
    fish.body.showFin();
  }

  for (const fish of predators) {
    fish.pursuer.pursue(preyList);
    fish.pursuer.separate(predatorList);
    fish.pursuer.update();
    fish.pursuer.wrapCoordinates();

    fish.body.setHeadPos(fish.pursuer.pos);
    fish.body.update();
    fish.body.showBodyShape();
    fish.body.showEyes();
  }
}
