import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GameState = {
  board: Uint8Array | null;
  currPiece: string | null;
  heldPiece: string | null;
  nextPiece: string | null;
};

const initialState: GameState = {
  board: null,
  currPiece: null,
  heldPiece: null,
  nextPiece: null,
};

createSlice({
  name: "GameState",
  initialState,
  reducers: {
    setGameState: (_, { payload }: PayloadAction<GameState>) => payload,
  },
});
