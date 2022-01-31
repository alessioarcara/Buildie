import Commands from "@constants/Commands";
import Board from "./Board";
import Piece from "./Piece";
import Shape from "./Shape";

class PiecePool {
  private _pool: Piece[];
  private _currPiece: Piece | null;
  private _nextPiece: Piece | null;
  private _heldPiece: Piece | null;
  private alreadyHeld = false;
  doesNextPieceFit = true;

  constructor(shapes: Shape[], board: Board) {
    this._pool = new Array(shapes.length);
    this._currPiece = null;
    this._nextPiece = null;
    this._heldPiece = null;

    for (let sIndex = 0; sIndex < shapes.length; sIndex += 1)
      this._pool[sIndex] = shapes[sIndex].newPiece(board);
  }

  get currPiece() {
    return this._currPiece;
  }

  get nextPiece() {
    return this._nextPiece;
  }

  get heldPiece() {
    return this._heldPiece;
  }

  private set currPiece(nextPiece) {
    this._currPiece = nextPiece;
  }

  private set nextPiece(newPiece) {
    this._nextPiece = newPiece;
  }

  private set heldPiece(currPiece) {
    this._heldPiece = currPiece;
  }

  private newPiece() {
    this.currPiece?.reset();
    this.alreadyHeld = false;
    // random piece
    this.currPiece = this.nextPiece;
    const rndIndex = Math.floor(Math.random() * this._pool.length);
    this.doesNextPieceFit = !this._pool[rndIndex].collides();
    // this.currPiece = this.doesNextPieceFit ? this._pool[rndIndex] : null;
    this.nextPiece = this.doesNextPieceFit ? this._pool[rndIndex] : null;
  }

  private holdPiece() {
    if (this.currPiece !== null && !this.alreadyHeld) {
      if (this.heldPiece === null) {
        this.currPiece.reset();
        this.heldPiece = this.currPiece;
        this.newPiece();
      } else {
        let temp = this.currPiece;
        this.currPiece = this.heldPiece;
        this.heldPiece = temp;
      }
      this.alreadyHeld = true;
    }
  }

  inputHandler = (keyCode: string) => {
    if (this.currPiece?.collided) return;
    if (keyCode === Commands.MoveLeft) this.currPiece?.moveLeft();
    else if (keyCode === Commands.MoveRight) this.currPiece?.moveRight();
    else if (keyCode === Commands.MoveDown) this.currPiece?.moveDown();
    else if (keyCode === Commands.RotateRight) this.currPiece?.rotateRight();
    else if (keyCode === Commands.HardDrop) this.currPiece?.hardDrop();
    else if (keyCode === Commands.HoldPiece) this.holdPiece();
  };

  update() {
    this.currPiece && !this.currPiece.collided
      ? this.currPiece?.moveDown()
      : this.newPiece();
  }
}

export default PiecePool;
