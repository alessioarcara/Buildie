import Points from "@constants/Points";

class Board {
  private _board;
  private _lines;
  private _speed;
  private _initialSpeed;
  private _score;
  static w = 12;
  static h = 24;

  constructor(
    initialBoard?: Uint8Array,
    initialSpeed = 1,
    initialLines = 0,
    initialScore = 0
  ) {
    this._initialSpeed = initialSpeed;
    this._speed = initialSpeed;
    this._lines = initialLines;
    this._score = initialScore;
    this._board = initialBoard ?? this.init();
  }

  get board() {
    return this._board;
  }

  get lines() {
    return this._lines;
  }

  get speed() {
    return this._speed;
  }

  get score() {
    return this._score;
  }

  init() {
    const board = new Uint8Array(Board.h * Board.w);
    for (let yIndex = 0; yIndex < Board.h; yIndex += 1)
      for (let xIndex = 0; xIndex < Board.w; xIndex += 1) {
        board[yIndex * Board.w + xIndex] =
          xIndex === 0 || xIndex === Board.w - 1 || yIndex === Board.h - 1
            ? 9
            : 0;
      }
    return board;
  }

  // update method
  clearLines(pyIndex: number) {
    let clearedLines = 0;
    // forward
    for (let yFwIndex = pyIndex; yFwIndex < Board.h - 1; yFwIndex += 1) {
      let isFilled = true;
      for (let xIndex = 0; xIndex < Board.w; xIndex += 1) {
        if (
          this._board[yFwIndex * Board.w + xIndex] === 0 ||
          this._board[yFwIndex * Board.w + xIndex] === undefined
        ) {
          isFilled = false;
          break;
        }
      }

      if (isFilled) {
        // backward
        for (let yBwIndex = yFwIndex; yBwIndex > 0; yBwIndex -= 1)
          for (let xIndex = 1; xIndex < Board.w - 1; xIndex += 1) {
            this.board[yBwIndex * Board.w + xIndex] =
              this.board[(yBwIndex - 1) * Board.w + xIndex];
          }
        clearedLines++;
        this._lines++;
      }
    }
    // scoring
    this._score += this.speed * clearedLines * Points[clearedLines];
    // speed
    this._speed = Math.floor((this.lines + 10) / 10) + (this._initialSpeed - 1);
  }

  reset() {
    this._score = 0;
    this._lines = 0;
    this._speed = 1;
    this._board = this.init();
  }
}

export default Board;
