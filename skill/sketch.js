let gap = 10;
let circleNum = 40;
let circleSize = 20;
let angle = 0;
let pointNum = 50;
let rectSize = 600;

let langs = [
  "GO",
  "PYTHON",
  "JAVASCRIPT VUE",
  "PHP OLD HUNTER",
  "GO ZERO ZONE PRG GAME",
  "ETCD REDIS KAFKA ELK DOCKER K8S ...",
  "C LISP PROCESSING FLUTTER",
  "SmartSub MockingBird",
];

function setup() {
  angleMode(RADIANS);
  newSetup();
}

function newSetup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("black");
  noCursor();
  noStroke();

  fill("red");
  circle(width / 2, height / 2, 10);

  fill("yellow");
  circle(mouseX, mouseY, 5);

  for (let i = 0; i < langs.length; i++) {
    rotateText(width / 2, height / 2, 30 * (i + 1), langs[i], i);
  }

  // Eat
  fill("yellow");
  let biteSize = PI / 16;
  let startAngle = biteSize * sin(frameCount * 0.1) + biteSize;
  let endAngle = TWO_PI - startAngle;
  arc(width / 2 - 160, height - 113, 14, 14, startAngle, endAngle, PIE);

  fill("red");
  circle(width / 2 - 158, height - 117, 2);

  fill("gray");
  // title
  push();
  translate(width / 2, height - 112);
  textFont("Arial");
  textSize(15);
  textAlign(CENTER, CENTER);
  text("xiaochuan @ https://github.com/paranoidxc", 0, 0);
  //textSize(10);
  //text("........ ... .....", 0, 20);
  pop();

  push();
  //border
  translate(width / 2, height / 2);
  noFill();
  stroke("white");
  strokeWeight(2);
  rectMode(CENTER);
  rect(0, 0, rectSize, rectSize);

  // random noise
  stroke("white");
  strokeWeight(1);
  for (let i = 0; i < pointNum; i++) {
    point(
      random(-rectSize / 2, rectSize / 2),
      random(-rectSize / 2, rectSize / 2)
    );
  }

  pop();
}

function rotateText(x, y, radius, txt, idx) {
  if (idx == 0) {
    charSpacingAngleDeg = 20;
  } else {
    charSpacingAngleDeg = 12 - idx;
  }

  chars = txt.split("");
  textAlign(CENTER, BASELINE);
  textSize(15);
  fill("white");

  push();
  translate(x, y);
  //console.log(angle)
  angle = angle + map(mouseX, 0, width, -0.01, 0.01);
  let radiansx =
    radians((-chars.length * charSpacingAngleDeg) / 2) + angle * (idx + 1);

  rotate(radiansx);
  //rotate(radians((-chars.length * charSpacingAngleDeg) / 2));

  for (let i = 0; i < chars.length; i++) {
    text(chars[i], 0, -radius);
    rotate(radians(charSpacingAngleDeg));
  }
  pop();
}
