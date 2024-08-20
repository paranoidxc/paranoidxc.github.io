function Particle(x, y, hu, firework) {
  this.pos = createVector(x, y);
  this.firework = firework;
  this.lifespan = 255;
  this.hu = hu;

  if (this.firework) {
    this.vel = createVector(0, random(-18, -10));
  } else {
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(2, 20));
  }
  this.acc = createVector(0, 0);

  this.applyForce = function (force) {
    this.acc.add(force);
  };

  this.update = function () {
    if (!this.firework) {
      this.vel.mult(0.8);
      this.lifespan -= 3;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    if (this.pos.y < 0) {
      this.pos.y = 0;
    }
    this.acc.mult(0);
  };

  this.show = function () {
    colorMode(HSB);
    if (!this.firework) {
      strokeWeight(2);
      stroke(hu, 255, 255, this.lifespan);
    } else {
      strokeWeight(4);
      stroke(hu, 255, 255, 255);
    }
    point(this.pos.x, this.pos.y);
  };

  this.done = function () {
    if (this.lifespan < 0) {
      return true;
    }
    return false;
  };
}
