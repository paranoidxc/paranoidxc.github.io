var mont1 = {
  r: 0,
  g: 0,
  b: 0,
};

var star1 = 0;
var star2 = 0;
var star3 = 0;
var star4 = 0;
var cynthia;

var startX = 0;
var sky = {
  r: 0,
  g: 0,
  b: 0,
};
var sun = {
  x: 0,
  y: 600,
  g: 0,
};
var spot = {
  x: 0,
  y: 0,
};

function setup() {
  createCanvas(350, 350);
}

function draw() {
  sky.r = map(startX, 0, 250, 20, 200);
  if (startX > 175) {
    sky.r = map(startX, 250, 500, 200, 20);
  }
  sky.g = map(startX, 0, 250, 50, 230);
  if (startX > 175) {
    sky.g = map(startX, 250, 500, 230, 50);
  }
  sky.b = map(startX, 0, 250, 70, 250);
  if (startX > 175) {
    sky.b = map(startX, 250, 500, 250, 70);
  }
  background(sky.r, sky.g, sky.b);

  let montColor = montColor1();
  fill(montColor.r, montColor.g, montColor.b);
  triangle(-350, 600, 70, 250, 400, 600);

  montColor = montColor2();
  fill(montColor.r, montColor.g, montColor.b);
  triangle(
    0,
    height,
    width / 2,
    height - height / 3,
    width - width / 4,
    height
  );
  montColor = montColor3();
  fill(montColor.r, montColor.g, montColor.b);
  triangle(
    100,
    height,
    width / 2,
    height - height / 3,
    width - width / 4,
    height
  );

  push();
  star1 = 70 - startX;
  if (startX > 100) {
    star1 = startX - 200;
  }
  fill(255, 210, 14, star1);

  translate(150, 50);
  rotate(frameCount / -120.0);
  star(0, 0, 4, 15, 4);
  pop();

  push();
  star2 = 80 - startX;
  if (startX > 100) {
    star2 = startX - 300;
  }
  fill(255, 210, 34, star2);
  translate(250, 80);
  rotate(frameCount / -240.0);
  star(0, 0, 5, 15, 4);
  pop();

  push();
  star3 = 30 - startX;
  if (startX > 100) {
    star3 = startX - 250;
  }
  fill(255, 210, 34, star3);
  translate(170, 100);
  rotate(frameCount / -100.0);
  star(0, 0, 5, 11, 4);
  pop();

  push();
  star4 = 40 - startX;
  if (startX > 100) {
    star4 = startX - 250;
  }
  fill(255, 210, 34, star4);
  translate(290, 280);

  star(0, 0, 3, 15, 4);
  pop();

  sun.x = startX;
  sun.y = 300 - sqrt(50000 - sq(sun.x - 250));

  sun.g = map(startX, 0, 250, 100, 133);
  if (startX < 250) {
    sun.g = map(startX, 250, 500, 133, 100);
  }
  //   color of sun
  fill(218, sun.g, 138);

  noStroke();
  ellipse(sun.x, sun.y, 60, 60);

  fill("#F3EFF0");
  rect(0, 0, 350, 20);
  rect(0, 0, 20, 350);
  rect(330, 0, 330, 350);
  rect(0, 330, 330, 330);

  push();
  stroke(25);
  strokeWeight(7);
  line(20, 20, 330, 20);
  line(20, 330, 330, 330);
  line(20, 20, 20, 330);
  line(330, 20, 330, 330);
  pop();

  startX += 1;
  if (startX > width) {
    startX = -100;
  }
}

function montColor1() {
  color = {
    r: 0,
    g: 0,
    b: 0,
  };
  color.r = map(startX, 0, 300, 130, 24);
  if (startX > 300) {
    color.r = map(startX, 300, 600, 24, 130);
  }
  color.g = map(startX, 0, 300, 155, 77);
  if (startX > 300) {
    color.g = map(startX, 300, 600, 77, 155);
  }
  color.b = map(startX, 0, 300, 166, 89);
  if (startX > 300) {
    color.b = map(startX, 300, 600, 89, 166);
  }
  return color;
}

function montColor2() {
  color = { r: 0, g: 0, b: 0 };
  color.r = map(startX, 0, width, 190, 100);
  color.b = color.g = color.r;
  return color;
}

function montColor3() {
  color = { r: 0, g: 0, b: 0 };
  color.r = map(startX, 0, 300, 150, 70);
  color.b = color.g = color.r;
  return color;
}

function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle / 2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
