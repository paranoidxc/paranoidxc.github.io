class Bird {
  constructor(brain) {
    if (brain) {
      this.brain = brain;
    } else {
      this.brain = ml5.neuralNetwork({
        inputs: 4,
        outputs: ["flap", "no flap"],
        task: "classification",

        // change to "neuroEvolution" for next ml5.js release
        neuroEvolution: true,
      });
    }

    this.x = 50;
    this.y = random(120, 150);

    this.w = 16;
    this.h = 16;

    this.r = sqrt((this.w / 2) * (this.w / 2) + (this.h / 2) * (this.h / 2));

    this.velocity = 0;
    this.gravity = 0.5;
    this.flapForce = -10;

    this.angle = 0;
    this.flapAngle = 0;

    this.fitness = 0;
    this.alive = true;
  }

  think(pipes) {
    let nextPipe = null;
    for (let pipe of pipes) {
      if (pipe.x + pipe.w > this.x) {
        nextPipe = pipe;
        break;
      }
    }

    let inputs = [
      this.y / height,
      this.velocity / height,
      nextPipe.top / height,
      (nextPipe.x - this.x) / width,
    ];

    let results = this.brain.classifySync(inputs);
    if (results[0].label == "flap") {
      this.flap();
    }
  }

  flap() {
    this.velocity += this.flapForce;
    this.flapAngle = 10;
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    this.velocity *= 0.95;

    if (this.flapAngle > 0) {
      this.angle += 20;
      this.flapAngle -= 1;
    } else {
      this.angle += 2;
    }

    if (this.y > height || this.y < 0) {
      this.alive = false;
    }

    this.fitness++;
  }

  show() {
    push();
    angleMode(DEGREES);
    strokeWeight(1);
    stroke(0);
    translate(this.x, this.y);
    //fill(255);
    //circle(0, 0, this.r * 2);
    fill(127, 200);
    rotate(this.angle);
    rect(-this.w / 2, -this.h / 2, this.w, this.h);
    pop();
  }
}
