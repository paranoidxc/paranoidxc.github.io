class Board {
  DIRECTIONS = { LEFT: 0, RIGHT: 1, UP: 2, DOWN: 3 };
  tile_colors = {
    0: ["#f9f6f2", "#f9f6f2"],
    2: ["#776e65", "#eee4da"],
    4: ["#776e65", "#ede0c8"],
    8: ["#f9f6f2", "#f2b179"],
    16: ["#f9f6f2", "#f59563"],
    32: ["#f9f6f2", "#f67c5f"],
    64: ["#f9f6f2", "#f65e3b"],
    128: ["#f9f6f2", "#edcf72"],
    256: ["#f9f6f2", "#edcc61"],
    512: ["#f9f6f2", "#edc850"],
    1024: ["#f9f6f2", "#edc53f"],
    2048: ["#f9f6f2", "#edc22e"],
  };

  other_colors = {
    bg: "#bbada0",
    tile_bg: "#f9f6f2",
    high_value: ["#fff", "#000"],
  };

  constructor(boardSize, padding = 8) {
    this.BOARD_SIZE = boardSize;
    this.PADDING = padding;
    this.SQAURE_SIZE = (width - padding * (boardSize + 1)) / boardSize;
    this.ANIMATION_FRAMES = 5;
    this.animation_frames_left = 0;
    this.animation = [];
    this.oldBoard = [];
    this.reset();
  }

  createArray(size, fill = undefined) {
    let arr = [];
    for (let _ = 0; _ < size; _++) {
      arr.push(fill);
    }
    return arr;
  }

  reset() {
    this.board = [];
    for (let _ = 0; _ < this.BOARD_SIZE; _++) {
      let row = [];
      this.board.push(this.createArray(this.BOARD_SIZE, 0));
    }

    this.spawn();
    this.spawn();
  }

  draw() {
    background(this.other_colors["bg"]);
    if (this.animation_frames_left === 0) {
      for (let row = 0; row < this.BOARD_SIZE; row++) {
        for (let col = 0; col < this.BOARD_SIZE; col++) {
          let value = this.board[row][col];
          let colors =
            this.tile_colors[value] || this.other_colors["high_value"];
          fill(colors[1]);
          let x = col * (this.SQAURE_SIZE + this.PADDING) + this.PADDING;
          let y = row * (this.SQAURE_SIZE + this.PADDING) + this.PADDING;

          rect(x, y, this.SQAURE_SIZE, this.SQAURE_SIZE, 10);
          fill(colors[0]);
          if (value !== 0) {
            text(value, x + this.SQAURE_SIZE / 2, y + this.SQAURE_SIZE / 2);
          }
        }
      }
    } else {
      // Draw the background
      fill(this.other_colors["tile_bg"]);
      for (let row = 0; row < this.BOARD_SIZE; row++) {
        for (let col = 0; col < this.BOARD_SIZE; col++) {
          let x = col * (this.SQAURE_SIZE + this.PADDING) + this.PADDING;
          let y = row * (this.SQAURE_SIZE + this.PADDING) + this.PADDING;
          rect(x, y, this.SQAURE_SIZE, this.SQAURE_SIZE, 10);
        }
      }
      // Draw the values
      for (let [value, x1, x2, y1, y2] of this.animation) {
        let colors = this.tile_colors[value] || this.other_colors["high_value"];
        fill(colors[1]);
        let x = lerp(
          x1,
          x2,
          (this.ANIMATION_FRAMES - this.animation_frames_left) /
            this.ANIMATION_FRAMES
        );
        let y = lerp(
          y1,
          y2,
          (this.ANIMATION_FRAMES - this.animation_frames_left) /
            this.ANIMATION_FRAMES
        );
        rect(x, y, this.SQAURE_SIZE, this.SQAURE_SIZE, 10);
        fill(colors[0]);
        if (value !== 0) {
          text(value, x + this.SQAURE_SIZE / 2, y + this.SQAURE_SIZE / 2);
        }
      }

      this.animation_frames_left -= 1;
    }
  }

  left() {
    this.moveLeft(this.DIRECTIONS.LEFT);
  }

  right() {
    this.reverseBoard();
    this.moveLeft(this.DIRECTIONS.RIGHT);
    this.reverseBoard();
  }

  up() {
    this.transposeBoard();
    this.moveLeft(this.DIRECTIONS.UP);
    this.transposeBoard();
  }

  down() {
    this.transposeBoard();
    this.reverseBoard();
    this.moveLeft(this.DIRECTIONS.DOWN);
    this.reverseBoard();
    this.transposeBoard();
  }

  move(dir) {
    this.oldBoard = board.copyBoard();
    switch (dir) {
      case this.DIRECTIONS.LEFT:
        this.left();
        break;
      case this.DIRECTIONS.RIGHT:
        this.right();
        break;
      case this.DIRECTIONS.UP:
        this.up();
        break;
      case this.DIRECTIONS.DOWN:
        this.down();
        break;
    }
    if (this.boardChanged()) {
      this.animation_frames_left = this.ANIMATION_FRAMES;
      this.spawn();
    }
  }

  moveLeft(actualDir) {
    this.animation = [];
    for (let rowNum = 0; rowNum < this.BOARD_SIZE; rowNum++) {
      let row = this.board[rowNum];
      let combined = this.createArray(this.BOARD_SIZE, false);
      for (let col = 0; col < this.BOARD_SIZE; col++) {
        if (row[col] === 0) {
          continue;
        }

        let value = row[col];
        row[col] = 0;
        // Move the cell back until it hits a non-zero or an edge
        let newCol = col - 1;
        while (row[newCol] === 0 && newCol > 0) {
          newCol--;
        }
        if (col === 0) {
          newCol = 0;
          row[newCol] = value;
        } else if (row[newCol] === 0) {
          row[newCol] = value;
        } else if (row[newCol] === value && !combined[newCol]) {
          row[newCol] = value * 2;

          score += value * 2;

          combined[newCol] = true;
        } else {
          newCol++;
          row[newCol] = value;
        }
        this.animation.push(
          this.calculateAnimation(value, rowNum, col, newCol, actualDir)
        );
      }
    }
  }

  calculateAnimation(value, row, oldCol, newCol, dir) {
    let col_1;
    let col_2;
    let row_1;
    let row_2;
    switch (dir) {
      case this.DIRECTIONS.LEFT:
        col_1 = oldCol;
        col_2 = newCol;
        row_1 = row;
        row_2 = row;
        break;
      case this.DIRECTIONS.RIGHT:
        col_1 = this.BOARD_SIZE - oldCol - 1;
        col_2 = this.BOARD_SIZE - newCol - 1;
        row_1 = row;
        row_2 = row;
        break;
      case this.DIRECTIONS.UP:
        col_1 = row;
        col_2 = row;
        row_1 = oldCol;
        row_2 = newCol;
        break;
      case this.DIRECTIONS.DOWN:
        col_1 = row;
        col_2 = row;
        row_1 = this.BOARD_SIZE - oldCol - 1;
        row_2 = this.BOARD_SIZE - newCol - 1;
        break;
    }
    let x1 = col_1 * (this.SQAURE_SIZE + this.PADDING) + this.PADDING;
    let x2 = col_2 * (this.SQAURE_SIZE + this.PADDING) + this.PADDING;
    let y1 = row_1 * (this.SQAURE_SIZE + this.PADDING) + this.PADDING;
    let y2 = row_2 * (this.SQAURE_SIZE + this.PADDING) + this.PADDING;
    return [value, x1, x2, y1, y2];
  }

  transposeBoard() {
    let newBoard = [];
    for (let row = 0; row < this.BOARD_SIZE; row++) {
      let newRow = [];
      for (let col = 0; col < this.BOARD_SIZE; col++) {
        newRow.push(this.board[col][row]);
      }
      newBoard.push(newRow);
    }
    this.board = newBoard;
  }

  reverseBoard() {
    this.board.map((row) => row.reverse());
  }

  spawn() {
    let empties = this.findEmpties();
    if (empties.length === 0) {
      return;
    }
    let space = random(empties);
    let num = random([2, 2, 2, 4]);
    this.board[space[0]][space[1]] = num;
    if (this.isGameOver()) {
      this.reset();
    }
  }

  findEmpties() {
    let empties = [];
    for (let row = 0; row < this.BOARD_SIZE; row++) {
      for (let col = 0; col < this.BOARD_SIZE; col++) {
        if (this.board[row][col] === 0) {
          empties.push([row, col]);
        }
      }
    }
    return empties;
  }

  copyBoard() {
    let newBoard = [];
    for (let row = 0; row < this.BOARD_SIZE; row++) {
      let newRow = this.board[row].slice();
      newBoard.push(newRow);
    }
    return newBoard;
  }

  boardChanged() {
    for (let row = 0; row < this.oldBoard.length; row++) {
      for (let col = 0; col < this.oldBoard.length; col++) {
        if (this.oldBoard[row][col] !== this.board[row][col]) {
          return true;
        }
      }
    }
    return false;
  }

  isGameOver() {
    for (let row = 0; row < this.BOARD_SIZE; row++) {
      for (let col = 0; col < this.BOARD_SIZE; col++) {
        if (
          (row < this.BOARD_SIZE - 1 &&
            this.board[row][col] === this.board[row + 1][col]) ||
          (col < this.BOARD_SIZE - 1 &&
            this.board[row][col] === this.board[row][col + 1]) ||
          this.board[row][col] === 0
        ) {
          return false;
        }
      }
    }
    return true;
  }
}
