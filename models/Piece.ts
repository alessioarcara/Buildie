import { BOARD_WIDTH } from "./Board";
import Shape from "./Shape";

export const PIECE_SIDE = 4;

class Piece {
  private _shape;
  // current position
  x;
  y;

  constructor(shape: Shape, x: number, y: number) {
    this.x = x;
    this.y = y;
    this._shape = shape;
  }

  get shape() {
    return this._shape.shape;
  }

  checkCollision(board: Uint8Array, new_x: number, new_y: number) {
    for (let pyIndex = 0; pyIndex < PIECE_SIDE; pyIndex += 1) {
      for (let pxIndex = 0; pxIndex < PIECE_SIDE; pxIndex += 1) {
        if (
          +this.shape[pyIndex * PIECE_SIDE + pxIndex] !== 0 &&
          board[(pyIndex + new_y) * BOARD_WIDTH + (pxIndex + new_x)] !== 0
        ) {
          console.log(new_x + pxIndex, new_y + pyIndex);
          return true;
        }
      }
    }
    return false;
  }

  update(board: Uint8Array) {
    if (this.checkCollision(board, this.x, this.y + 1)) return;
    this.y += 1;
  }
}

export default Piece;
