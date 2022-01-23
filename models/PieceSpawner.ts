import Shape from "./Shape";

class PieceSpawner {
  _pieceShapes;

  constructor(shapes: { [key: string]: string }) {
    this._pieceShapes = Object.values(shapes).map((shape) => new Shape(shape));
  }

  spawnRandomPiece(x: number, y: number) {
    return this._pieceShapes[
      Math.floor(Math.random() * this._pieceShapes.length)
    ].newPiece(x, y);
  }
}

export default PieceSpawner;
