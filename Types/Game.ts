type GameState = {
  initialSpeed?: number;
  initialLines?: number;
  initialScore?: number;
  initialIndexCurrPiece?: number;
  initialIndexHeldPiece?: number;
  initialIndexNextPiece?: number;
};

export type InitialGameState = {
  initialBoard?: Uint8Array;
} & GameState;

export type SerializedGameState = {
  initialBoard?: number[];
} & GameState;
