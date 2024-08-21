class Pipe {
  constructor() {
    this.spacing = 100;
    this.top = random(height - this.spacing);
    this.bottom = this.top + this.spacing;
    this.x = width;
    this.w = 20;
    this.velocity = 2;

    this.horizontalDivs = 5;
    this.windowSize = this.w / this.horizontalDivs;
    this.topMax = floor((this.top - this.windowSize) / (this.windowSize * 3));
    this.bottomMax = floor(
      (height - this.bottom - this.windowSize) / (this.windowSize * 3)
    );
  }

  collides(bird) {
    let verticalCollision =
      bird.y - bird.r < this.top || bird.y + bird.r > this.bottom;
    let horizontalCollision = bird.x > this.x && bird.x < this.x + this.w;
    return verticalCollision && horizontalCollision;
  }

  show() {
    noFill();
    stroke(0);
    //top
    rect(this.x, -1, this.w, this.top + 1);

    for (let i = this.topMax; i > 0; i--) {
      fill(111);
      let topY = this.top - this.windowSize * 3 * i - this.windowSize;
      rect(
        this.x + this.windowSize,
        topY,
        this.windowSize,
        this.windowSize * 2
      );
      rect(
        this.x + this.w - 2 * this.windowSize,
        topY,
        this.windowSize,
        this.windowSize * 2
      );
    }

    //bottom
    noFill();
    rect(this.x, this.bottom, this.w, height - this.bottom + 1);

    for (let i = this.bottomMax; i > 0; i--) {
      fill(111);
      if (this.bottom + this.windowSize * 3 * i + this.windowSize < height) {
        let bottomY = this.bottom + this.windowSize * 3 * i - this.windowSize;
        rect(
          this.x + this.windowSize,
          bottomY,
          this.windowSize,
          this.windowSize * 2
        );
        rect(
          this.x + this.w - 2 * this.windowSize,
          bottomY,
          this.windowSize,
          this.windowSize * 2
        );
      }
    }
  }

  update() {
    this.x -= this.velocity;
  }

  offscreen() {
    return this.x < -this.w;
  }
}
