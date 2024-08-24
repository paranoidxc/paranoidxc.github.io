let vehicles = [];
let img;
let _width;
let _height;
function preload() {
  if (random(1) < 0.5) {
    _width = 400;
    _height = 800;
    img = loadImage("wukong.png");
  } else {
    _width = 800;
    _height = 500;
    radius = 10;
    img = loadImage("wukong2.png");
  }
}
let shape;
let cols, rows;
let radius = 10;

function setup() {
  createCanvas(_width, _height);
  pixelDensity(1);
  img.resize(_width, _height);

  cols = floor(_width / radius);
  rows = floor(_height / radius);

  img.loadPixels();
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let centerX = j * radius + radius / 2;
      let centerY = i * radius + radius / 2;

      let idx = (int(j) + int(i) * img.width) * radius * 4;
      let r = img.pixels[idx + 0];
      let g = img.pixels[idx + 1];
      let b = img.pixels[idx + 2];
      let a = img.pixels[idx + 3];

      let color = new MyColor(r, g, b, a);
      let vehicle = new Vehicle(centerX, centerY, radius, color);
      vehicles.push(vehicle);
    }
  }
}

function draw() {
  background(0);
  for (let i = 0; i < vehicles.length; i++) {
    let v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}

function MyColor(r, g, b, a) {
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
}
