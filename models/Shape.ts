import Piece from "./Piece";

class Shape {
  private _shape;
  // starting position
  private _x;
  private _y;

  constructor(shape: string, x: number, y: number) {
    this._shape = shape;
    this._x = x;
    this._y = y;
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

  newPiece() {
    return new Piece(this);
  }
}

export default Shape;
