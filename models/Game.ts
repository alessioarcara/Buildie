import ShapeFactory from "./ShapeFactory";
import shapes from "@constants/Shapes.json";
import Board from "./Board";
import PiecePool from "./PiecePool";

class Game {
  private _piecePool;
  private _board;

  constructor(initialSpeed = 1) {
    this._board = new Board(initialSpeed);
    this._piecePool = new PiecePool(
      new ShapeFactory(shapes).shapeTypes,
      this._board
    );
  }

  get board() {
    return this._board.board;
  }

  get currPiece() {
    return this._piecePool.currPiece;
  }

  get heldPiece() {
    return this._piecePool.heldPiece?.shape;
  }

  get nextPiece() {
    return this._piecePool.nextPiece?.shape;
  }

  get speed() {
    return this._board.speed;
  }

  get nlines() {
    return this._board.nlines;
  }

  get score() {
    return this._board.score;
  }

  get gameOver() {
    return !this._piecePool.doesNextPieceFit;
  }

  get inputHandler() {
    return this._piecePool.inputHandler;
  }

  update() {
    !this.gameOver && this._piecePool.update();
  }
}

export default Game;
