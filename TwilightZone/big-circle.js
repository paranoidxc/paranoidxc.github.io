class BigCircle {
  constructor() {
    this.backgroundColor = color(colors.black);
    this.targetBackgroundColor = color(colors.black);
    this.foregroundColor = color(colors.white);
    this.targetForegroundColor = color(colors.white);
  }

  draw() {
    this.backgroundColor = lerpColor(
      this.backgroundColor,
      this.targetBackgroundColor,
      0.15
    );
    this.foregroundColor = lerpColor(
      this.foregroundColor,
      this.targetForegroundColor,
      0.15
    );
    push();
    strokeWeight(4);
    stroke(this.foregroundColor);
    background(this.backgroundColor);
    fill(this.foregroundColor);
    arc(
      CANVAS_SIZE / 2,
      CANVAS_SIZE / 2 + BIG_CIRCLE_RADIUS / 4,
      BIG_CIRCLE_RADIUS,
      BIG_CIRCLE_RADIUS,
      HALF_PI,
      TWO_PI - PI / 2
    );
    fill(this.backgroundColor);
    arc(
      CANVAS_SIZE / 2,
      CANVAS_SIZE / 2 + BIG_CIRCLE_RADIUS / 4,
      BIG_CIRCLE_RADIUS,
      BIG_CIRCLE_RADIUS,
      TWO_PI - PI / 2,
      HALF_PI
    );
    fill(this.backgroundColor);
    arc(
      CANVAS_SIZE / 2,
      CANVAS_SIZE / 2 + BIG_CIRCLE_RADIUS / 2,
      BIG_CIRCLE_RADIUS / 2,
      BIG_CIRCLE_RADIUS / 2,
      HALF_PI,
      TWO_PI - PI / 2
    );

    fill(this.foregroundColor);
    arc(
      CANVAS_SIZE / 2,
      CANVAS_SIZE / 2,
      BIG_CIRCLE_RADIUS / 2,
      BIG_CIRCLE_RADIUS / 2,
      TWO_PI - PI / 2,
      HALF_PI
    );
    pop();
  }

  toBlack() {
    this.targetBackgroundColor = color(colors.white);
    this.targetForegroundColor = color(colors.black);
  }

  toWhite() {
    this.targetBackgroundColor = color(colors.black);
    this.targetForegroundColor = color(colors.white);
  }
}
