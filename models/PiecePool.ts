import Board from "./Board";
import Piece from "./Piece";
import Shape from "./Shape";

class PiecePool {
  private _pool: Piece[];
  private _currPiece: Piece | null;
  private _heldPiece: Piece | null;
  doesNextPieceFit = true;

  constructor(shapes: Shape[], board: Board) {
    this._pool = new Array(shapes.length);
    this._currPiece = null;
    this._heldPiece = null;

    for (let sIndex = 0; sIndex < shapes.length; sIndex += 1)
      this._pool[sIndex] = shapes[sIndex].newPiece(board);
  }

  get currPiece() {
    return this._currPiece;
  }

  private set currPiece(newPiece) {
    this._currPiece = newPiece;
  }

  nextPiece() {
    if (this.currPiece) {
      this.currPiece.reset();
      this._pool.push(this.currPiece);
    }

    const rndIndex = Math.floor(Math.random() * this._pool.length);
    this.doesNextPieceFit = !this._pool[rndIndex].collides();
    if (this.doesNextPieceFit)
      this.currPiece = this._pool.splice(rndIndex, 1)[0];
  }

  holdPiece() {
    if (!this.currPiece?.collided) {
      this._heldPiece = this.currPiece;
      this.currPiece = null;
      this.nextPiece();
    }
  }

  update() {
    this.currPiece && !this.currPiece.collided
      ? this.currPiece?.moveDown()
      : this.nextPiece();
  }
}

export default PiecePool;
