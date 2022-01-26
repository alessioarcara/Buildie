import BoardPool from "./BoardPool";
import PiecePool from "./PiecePool";
import ShapeFactory from "./ShapeFactory";
import shapes from "@constants/Shapes.json";

class Game {
  private _boardPool;
  private _piecePool;
  private _shapes;
  private _speed = 1;

  constructor(numPlayers: number) {
    this._shapes = new ShapeFactory(shapes);
    this._boardPool = new BoardPool(numPlayers);
    this._piecePool = new Array<PiecePool>(numPlayers);

    for (let i = 0; i < numPlayers; i++) {
      this._piecePool[i] = new PiecePool(
        this._shapes.shapeTypes,
        this.boardPool[i]
      );
    }

    this.init();
  }

  get boardPool() {
    return this._boardPool.pool;
  }

  get piecePool() {
    return this._piecePool;
  }

  get speed() {
    return this._speed;
  }

  init() {
    this.piecePool[0].sample();
  }

  update() {
    // this._boardPool.update();
    for (let i = 0; i < this.piecePool.length; i++) {
      this.piecePool[i].update();
    }
  }
}

export default Game;
