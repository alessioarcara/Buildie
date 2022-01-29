import Board from "./Board";
import Piece from "./Piece";
import Shape from "./Shape";

class ShapeFactory {
  private _shapeTypes: Shape[] = [];

  constructor(initialShapes: { [key: string]: string }) {
    for (const shape in initialShapes) {
      this._shapeTypes.push(
        new Shape(initialShapes[shape], (Board.w - Piece.w) / 2, -1, 0)
      );
    }
  }

  get shapeTypes() {
    return this._shapeTypes;
  }
}

export default ShapeFactory;
