let fireworks = [];
let gravity;
let blowSound;
let explosionSound;
let blowImpactSound;

function preload() {
  blowSound = loadSound("assets/heigh-hoo_blow_firework.mp3");
  explosionSound = loadSound(
    "assets/rudmer-rotteveel__whistle-and-explosion-single-firework.mp3"
  );
  blowImpactSound = loadSound("assets/schafferdavid_fireworks-impact.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  gravity = createVector(0, 0.2);
  stroke(255);
  strokeWeight(4);
  blowImpactSound.amp(1.5);
}

function draw() {
  colorMode(RGB);
  background(0, 25);

  if (random(1) < 0.03) {
    fireworks.push(new Firework());
  }
  for (var i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
