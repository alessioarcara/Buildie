import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authSlice from "./auth";
import { gameApi } from "../services/gameApi";

const store = configureStore({
  reducer: {
    auth: authSlice,
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
