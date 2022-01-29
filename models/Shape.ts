import Board from "./Board";
import Piece from "./Piece";

class Shape {
  private _shape;
  // initial position
  private _x;
  private _y;
  private _r;

  constructor(shape: string, x: number, y: number, r: number) {
    this._shape = shape;
    this._x = x;
    this._y = y;
    this._r = r;
  }

  get shape() {
    return this._shape;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get r() {
    return this._r;
  }

  newPiece(board: Board) {
    return new Piece(this, board);
  }
}

export default Shape;
