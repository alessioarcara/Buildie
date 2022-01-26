import Board from "./Board";
import Piece from "./Piece";
import Shape from "./Shape";

class PiecePool {
  private _pool: Piece[];
  private _currPiece: Piece | null;

  constructor(shapes: Shape[], board: Board) {
    this._pool = new Array(shapes.length);
    this._currPiece = null;

    for (let sIndex = 0; sIndex < shapes.length; sIndex += 1)
      this._pool[sIndex] = shapes[sIndex].newPiece(board);
  }

  get currPiece() {
    return this._currPiece;
  }

  private set currPiece(newPiece) {
    this._currPiece = newPiece;
  }

  sample() {
    if (this.currPiece) {
      this.currPiece.reset();
      this._pool.push(this.currPiece);
    }
    this.currPiece = this._pool.splice(
      Math.floor(Math.random() * this._pool.length),
      1
    )[0];
  }

  update() {
    !this._currPiece?.collided ? this.currPiece?.moveDown() : this.sample();
  }
}

export default PiecePool;
