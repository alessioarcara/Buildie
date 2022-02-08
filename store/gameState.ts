import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SerializedGameState } from "../types/Game";

const initialState: SerializedGameState = {};

const gameSlice = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    setGameState: (_, { payload }: PayloadAction<SerializedGameState>) =>
      payload,
    setGameSpeed: (_, { payload }: PayloadAction<number>) => ({
      initialSpeed: payload,
    }),
    resetGameState: (state) => ({
      initialSpeed: state.initialSpeed,
    }),
  },
});

export const { setGameState, setGameSpeed, resetGameState } = gameSlice.actions;
export default gameSlice.reducer;
