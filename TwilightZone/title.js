class BigTitle {
  constructor() {
    this.targetForegroundColor = color(colors.white);
    this.size = 50;
    this.offset = 110;
    this.gap = 40;
  }

  draw() {
    push();
    fill(this.targetForegroundColor);
    textSize(this.size);
    textAlign(CENTER);
    text("虚而不屈", width / 2, this.offset);
    text("动而愈出", width / 2, this.offset + this.size + this.gap);
    pop();
  }

  toBlack() {
    this.targetForegroundColor = color(colors.black);
  }

  toWhite() {
    this.targetForegroundColor = color(colors.white);
  }
}
