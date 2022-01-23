import Piece from "./Piece";
import PieceSpawner from "./PieceSpawner";

export const BOARD_HEIGHT = 24;
export const BOARD_WIDTH = 12;

class Board {
  private _board;
  private _currPiece: null | Piece;

  constructor() {
    this._board = new Uint8Array(BOARD_HEIGHT * BOARD_WIDTH);
    this._currPiece = null;

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

  get board() {
    return this._board;
  }

  get currPiece() {
    return this._currPiece;
  }

  init(pieceSpawner: PieceSpawner) {
    this._currPiece = pieceSpawner.spawnRandomPiece((BOARD_WIDTH - 4) / 2, 0);
  }

  update() {
    this.currPiece?.update(this.board);
    console.log(this.currPiece);
  }
}

export default Board;
