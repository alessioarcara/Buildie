import Board from "./Board";
import Shape from "./Shape";

class Piece {
  private _shape;
  #board;
  // current position
  x;
  y;
  r;
  collided;
  static w = 4;

  constructor(shape: Shape, board: Board) {
    this.x = shape.x;
    this.y = shape.y;
    this.r = shape.r;
    this._shape = shape;
    this.#board = board;
    this.collided = false;
  }

  get shape() {
    return this._shape.shape;
  }

  get board() {
    return this.#board.board;
  }

  reset() {
    this.x = this._shape.x;
    this.y = this._shape.y;
    this.r = this._shape.r;
    this.collided = false;
  }

  rotate(pxIndex: number, pyIndex: number, r: number) {
    switch (r % 4) {
      case 1:
        // 90°) i = w(w-1) + y - wx
        return Piece.w * (Piece.w - 1) + pyIndex - Piece.w * pxIndex;
      case 2:
        // 180°) i = w^2 - 1 - wy - x
        return Piece.w * Piece.w - 1 - Piece.w * pyIndex - pxIndex;
      case 3:
        // 270°) i = w - 1 - y + wx
        return Piece.w - 1 - pyIndex + Piece.w * pxIndex;
      default:
        // 0°) i = wy + x
        return Piece.w * pyIndex + pxIndex;
    }
  }

  collides(new_x = this.x, new_y = this.y, new_r = this.r) {
    for (let pyIndex = 0; pyIndex < Piece.w; pyIndex += 1)
      for (let pxIndex = 0; pxIndex < Piece.w; pxIndex += 1) {
        if (
          +this.shape[this.rotate(pxIndex, pyIndex, new_r)] !== 0 &&
          this.board[(pyIndex + new_y) * Board.w + (pxIndex + new_x)] !== 0
        )
          return true;
      }
    return false;
  }

  private lock() {
    for (let pyIndex = 0; pyIndex < Piece.w; pyIndex += 1)
      for (let pxIndex = 0; pxIndex < Piece.w; pxIndex += 1) {
        if (+this.shape[this.rotate(pxIndex, pyIndex, this.r)] !== 0)
          this.board[(pyIndex + this.y) * Board.w + (pxIndex + this.x)] =
            +this.shape[this.rotate(pxIndex, pyIndex, this.r)];
      }
  }

  // update method
  moveDown() {
    if (this.collides(this.x, this.y + 1)) {
      this.collided = true;
      this.lock();
      this.#board.clearLines(this.y);
      return;
    }
    this.y += 1;
  }

  moveLeft() {
    this.x -= !this.collides(this.x - 1) ? 1 : 0;
  }

  moveRight() {
    this.x += !this.collides(this.x + 1) ? 1 : 0;
  }

  private wallKick(offset = 0): number {
    // stop
    if (
      !this.collides(this.x + offset, this.y, this.r + 1) ||
      offset < -1 ||
      offset > 1
    ) {
      return offset;
      // recursive
    } else {
      return this.wallKick((offset += this.x > Board.w / 2 ? -1 : 1));
    }
  }

  rotateRight() {
    // wall kick
    const offset = this.wallKick();
    if (!this.collides(this.x + this.wallKick(), this.y, this.r + 1)) {
      this.x += offset;
      this.r += 1;
    }
  }

  hardDrop() {
    while (!this.collided) this.moveDown();
  }
}

export default Piece;
