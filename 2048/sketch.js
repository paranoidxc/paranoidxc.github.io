const padding = 8;
let board;
let score = 0;

function setup() {
  let boardSize = 4;
  let padding = 8;

  let canvasSize = boardSize * 100 + boardSize * padding;
  createCanvas(canvasSize, canvasSize);

  textSize(36);
  textAlign(CENTER, CENTER);
  board = new Board(boardSize, 8);
}

function draw() {
  board.draw();
  select("#score").html(score);
}

function keyPressed() {
  move_keys = [LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW];
  other_keys = ["R".charCodeAt(0)];
  if (keyCode === LEFT_ARROW) {
    board.move(board.DIRECTIONS.LEFT);
  } else if (keyCode === RIGHT_ARROW) {
    board.move(board.DIRECTIONS.RIGHT);
  } else if (keyCode === UP_ARROW) {
    board.move(board.DIRECTIONS.UP);
  } else if (keyCode === DOWN_ARROW) {
    board.move(board.DIRECTIONS.DOWN);
  } else if (keyCode === "R".charCodeAt(0)) {
    board.reset();
  }
}
