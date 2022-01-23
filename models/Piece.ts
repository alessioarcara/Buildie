import Shape from "./Shape";

class Piece {
  private _shape;
  // current position
  private _x;
  private _y;

  constructor(shape: Shape) {
    this._x = shape.x;
    this._y = shape.y;
    this._shape = shape;
  }

  get shape() {
    return this._shape.shape;
  }

  update() {
    console.log(this._x, this._y);
  }
}

export default Piece;
