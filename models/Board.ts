import Points from "@constants/Points";

class Board {
  private _board;
  private _nlines = 0;
  speed;
  score = 0;
  static w = 12;
  static h = 24;

  constructor(initialSpeed: number) {
    this.speed = initialSpeed;
    this._board = new Uint8Array(Board.h * Board.w);

    for (let yIndex = 0; yIndex < Board.h; yIndex += 1)
      for (let xIndex = 0; xIndex < Board.w; xIndex += 1) {
        this._board[yIndex * Board.w + xIndex] =
          xIndex === 0 || xIndex === Board.w - 1 || yIndex === Board.h - 1
            ? 9
            : 0;
      }
  }

  get board() {
    return this._board;
  }

  get nlines() {
    return this._nlines;
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
        this._nlines++;
      }
    }
    // scoring
    this.score += this.speed * clearedLines * Points[clearedLines];
    // speed
    this.speed = Math.floor((this.nlines + 10) / 10);
  }
}

export default Board;
