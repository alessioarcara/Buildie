import ShapeFactory from "./ShapeFactory";
import shapes from "@constants/Shapes.json";
import Player from "./Player";

class Game {
  private _playerPool: Player[];
  private _shapes;

  constructor(numPlayers: number, initialSpeed: number) {
    this._shapes = new ShapeFactory(shapes);
    this._playerPool = new Array(numPlayers);

    for (let i = 0; i < numPlayers; i += 1) {
      this._playerPool[i] = new Player(this._shapes.shapeTypes, initialSpeed);
    }
  }

  get playerPool() {
    return this._playerPool;
  }

  update() {
    for (let i = 0; i < this._playerPool.length; i += 1) {
      this._playerPool[i].update();
    }
  }
}

export default Game;
