import * as SecureStore from "expo-secure-store";
import { AuthData } from "../types/User";
import { AppThunk, RootState } from ".";
import { login, logout } from "./auth";
import { USER_DATA } from "@constants/PersistedData";
import { gameApi } from "../services/gameApi";

const saveUserDataToStorage = (userData: AuthData) => {
  SecureStore.setItemAsync(USER_DATA, JSON.stringify(userData));
};

export const authenticate =
  (authData: AuthData): AppThunk =>
  async (dispatch) => {
    dispatch(login(authData));
    saveUserDataToStorage(authData);
  };

export const invalidate = (): AppThunk => (dispatch, getState) => {
  const refreshToken = (getState() as RootState).auth.refreshToken;
  SecureStore.deleteItemAsync(USER_DATA);
  dispatch(gameApi.endpoints.logout.initiate(refreshToken!));
  dispatch(logout());
};
