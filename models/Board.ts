import Piece from "./Piece";

export const BOARD_HEIGHT = 24;
export const BOARD_WIDTH = 12;

class Board {
  private _board;
  private currPiece: null | Piece;

  constructor() {
    this._board = new Uint8Array(BOARD_HEIGHT * BOARD_WIDTH);
    this.currPiece = null;

    for (let yIndex = 0; yIndex < BOARD_HEIGHT; yIndex += 1)
      for (let xIndex = 0; xIndex < BOARD_WIDTH; xIndex += 1) {
        this._board[yIndex * BOARD_WIDTH + xIndex] =
          xIndex === 0 ||
          xIndex === BOARD_WIDTH - 1 ||
          yIndex === BOARD_HEIGHT - 1
            ? 9
            : 0;
      }
  }

  get board(): Uint8Array {
    return this._board;
  }

  init(piece: Piece) {
    this.currPiece = piece;
    for (let pyIndex = 0; pyIndex < 4; pyIndex += 1) {
      for (let pxIndex = 0; pxIndex < 4; pxIndex += 1) {
        const roiIndex = pyIndex * BOARD_WIDTH + (pxIndex + 4);
        const pIndex = pyIndex * 4 + pxIndex;
        this._board[roiIndex] = this._board[roiIndex] | +piece.shape[pIndex];
      }
    }
  }

  move() {}

  update() {
    for (let pyIndex = 0; pyIndex < 4; pyIndex += 1) {
      for (let pxIndex = 0; pxIndex < 4; pxIndex += 1) {
        const roiIndex =
          pyIndex * BOARD_WIDTH + BOARD_HEIGHT * 4 + (pxIndex + 4);
        const pIndex = pyIndex * 4 + pxIndex;
        this._board[roiIndex] =
          this._board[roiIndex] | +this.currPiece?.shape[pIndex];
      }
    }
    // this.currPiece?.update();
  }
}

export default Board;
