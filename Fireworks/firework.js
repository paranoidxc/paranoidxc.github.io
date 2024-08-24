function Firework() {
  this.hu = random(255);
  this.firework = new Particle(random(width), height, this.hu, true);
  this.exploded = false;
  this.particles = [];
  this.isPlayingSournd = false;

  this.done = function () {
    if (this.exploded && this.particles.length == 0) {
      return true;
    }

    return false;
  };
  this.update = function () {
    if (!this.exploded) {
      if (this.firework) {
        this.firework.applyForce(gravity);
        this.firework.update();

        if (this.firework.vel.y >= 0) {
          this.explode();
          this.firework = null;
          this.exploded = true;
        }
      }

      if (!this.isPlayingSound) {
        explosionSound.play();
        this.isPlayingSound = true;
      }
    }

    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  };

  this.explode = function () {
    if (random(0, 1) > 0.3) {
      for (var i = 0; i < 100; i++) {
        var p = new Particle(
          this.firework.pos.x,
          this.firework.pos.y,
          this.hu,
          false
        );
        this.particles.push(p);
      }
    } else {
      for (let a = 0; a < TWO_PI; a += 0.08) {
        const r = 5;
        const x = r * 16 * pow(sin(a), 3) - 10;
        const y =
          -r * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));
        const newX = random(x - 10, x + 10);
        const newY = random(y - 10, y + 10);
        let target;
        if (false) {
          target = createVector(this.pos.x + x, this.pos.y + y);
        } else {
          // Randomize
          target = createVector(
            this.firework.pos.x + newX,
            this.firework.pos.y + newY
          );
          maxForce = random(0.1, 1);
          maxSpeed = random(2, 5);
        }
        this.particles.push(
          new ParticleHeart(
            this.firework.pos,
            target,
            this.hu,
            maxForce,
            maxSpeed,
            3
          )
        );
      }
    }

    let rd = random(1);
    if (rd < 0.2) {
      blowSound.play();
    } else if (rd < 0.5) {
      blowImpactSound.play();
    }
  };

  this.show = function () {
    if (this.firework) {
      this.firework.show();
    }

    for (var i = 0; i < this.particles.length; i++) {
      //this.particles[i].applyForce(gravity);
      //this.particles[i].update();
      this.particles[i].show();
    }
  };
}
