import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SerializedGameState } from "../types/Game";

const initialState: SerializedGameState = {};

const gameSlice = createSlice({
  name: "GameState",
  initialState,
  reducers: {
    setGameState: (_, { payload }: PayloadAction<SerializedGameState>) =>
      payload,
    setGameSpeed: (_, { payload }: PayloadAction<number>) => ({
      initialSpeed: payload,
    }),
  },
});

export const { setGameState, setGameSpeed } = gameSlice.actions;
export default gameSlice.reducer;
