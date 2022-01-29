import Shape from "./Shape";
import PiecePool from "./PiecePool";
import Board from "./Board";

class Player {
  private _piecePool;
  private _board;
  private _speed;

  constructor(shapes: Shape[], initialSpeed: number) {
    this._speed = initialSpeed;
    this._board = new Board();
    this._piecePool = new PiecePool(shapes, this._board);
  }

  get board() {
    return this._board.board;
  }

  get currPiece() {
    return this._piecePool.currPiece;
  }

  get speed() {
    return this._speed;
  }

  set speed(newSpeed) {
    this._speed = newSpeed;
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

  update() {
    this._piecePool.update();
    this.speed = Math.ceil((12 + this.nlines) % 10);
  }
}

export default Player;
