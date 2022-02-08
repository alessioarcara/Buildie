import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authSlice from "./auth";
import gameSlice from "./gameState";
import settingsSlice from "./settings";
import scoresSlice from "./scores";
import { gameApi } from "../services/gameApi";

const store = configureStore({
  reducer: {
    auth: authSlice,
    game: gameSlice,
    settings: settingsSlice,
    scores: scoresSlice,
    [gameApi.reducerPath]: gameApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gameApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
