import Piece from "./Piece";

class Shape {
  private _shape;

  constructor(shape: string) {
    this._shape = shape;
  }

  get shape() {
    return this._shape;
  }

  newPiece(x: number, y: number) {
    return new Piece(this, x, y);
  }
}

export default Shape;
