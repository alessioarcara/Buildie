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

enum GameStatus {
  IDLE = "IDLE",
  STARTED = "STARTED",
  FINISHED = "FINISHED",
}

export type GameData = {
  _id: string;
  gameStatus: GameStatus;
  winner: string;
  initiatorBoard: number[];
  initiatorGameover: boolean;
  inviteeBoard: number[];
  inviteeGameOver: boolean;
};

export type GameResponse = {
  data?: GameData;
  problem?: string;
};

export type GameRequest = {
  gameId: string;
  gameOver: boolean;
  playerBoard: number[];
};
