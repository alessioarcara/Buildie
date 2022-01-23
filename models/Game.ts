import BoardPool from "./BoardPool";
import PieceSpawner from "./PieceSpawner";
import shapes from "../constants/Shapes.json";

class Game {
  private _boardPool;

  constructor(numPlayers: number) {
    this._boardPool = new BoardPool(numPlayers);
    const pieceSpawner = new PieceSpawner(shapes);
    this.boardPool[0].init(pieceSpawner);
  }

  init() {}

  update() {
    this._boardPool.update();
  }

  get boardPool() {
    return this._boardPool.pool;
  }
}

export default Game;
