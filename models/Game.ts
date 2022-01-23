import BoardPool from "./BoardPool";
import PieceSpawner from "./PieceSpawner";

class Game {
  private _boardPool;

  constructor(numPlayers: number) {
    this._boardPool = new BoardPool(numPlayers);

    const piece = new PieceSpawner().spawnRandomPiece();

    this.boardPool[0].init(piece);
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
