import ShapeFactory from "./ShapeFactory";
import shapes from "@constants/Shapes.json";
import Board from "./Board";
import PiecePool from "./PiecePool";
import { InitialGameState } from "../types/Game";

class Game {
  private _piecePool;
  private _board;

  constructor({
    initialBoard,
    initialIndexCurrPiece,
    initialIndexHeldPiece,
    initialIndexNextPiece,
    initialSpeed,
    initialLines,
    initialScore,
  }: InitialGameState) {
    this._board = new Board(
      initialBoard,
      initialSpeed,
      initialLines,
      initialScore
    );
    this._piecePool = new PiecePool(
      new ShapeFactory(shapes).shapeTypes,
      this._board,
      initialIndexCurrPiece,
      initialIndexHeldPiece,
      initialIndexNextPiece
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

  get lines() {
    return this._board.lines;
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

  reset() {
    this._board.reset();
    this._piecePool.reset();
  }
}

export default Game;
