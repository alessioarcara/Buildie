import Shape from "./Shape";
import shapes from "../constants/Shapes.json";
import { randomInteger } from "../utils/utils";

class PieceSpawner {
  static pieceShapes = shapes;

  constructor() {}

  spawnRandomPiece() {
    const shapeTypes = Object.keys(shapes);
    const rndIndex = shapeTypes[randomInteger(0, shapeTypes.length - 1)];
    return new Shape(shapes[rndIndex]).newPiece();
  }
}

export default PieceSpawner;
