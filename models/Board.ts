class Board {
  private _board;
  private _nlines = 0;
  static w = 12;
  static h = 24;

  constructor() {
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

  // update method
  clearLines() {
    // forward
    for (let yFwIndex = 0; yFwIndex < Board.h - 1; yFwIndex += 1) {
      let isFilled = true;
      for (let xIndex = 0; xIndex < Board.w; xIndex += 1) {
        if (this._board[yFwIndex * Board.w + xIndex] === 0) {
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
        this._nlines++;
      }
    }
  }
}

export default Board;
