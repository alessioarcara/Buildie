import Board from "./Board";

class BoardPool {
  private _pool: Board[];

  constructor(size: number) {
    this._pool = new Array(size);

    for (let i = 0; i < this._pool.length; i += 1) {
      this._pool[i] = new Board();
    }
  }

  get pool() {
    return this._pool;
  }

  // update() {
  //   for (let i = 0; i < this._pool.length; i += 1) {
  //     this._pool[i].clearLines();
  //   }
  // }
}

export default BoardPool;
