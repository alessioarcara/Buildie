import * as SecureStore from "expo-secure-store";
import { AuthData } from "../models/User";
import { AppThunk } from ".";
import { login, logout } from "./auth";

export const USER_DATA = "userData";

const saveDataToStorage = (userData: AuthData) => {
  SecureStore.setItemAsync(USER_DATA, JSON.stringify(userData));
};

export const authenticate =
  (authData: AuthData): AppThunk =>
  async (dispatch) => {
    dispatch(login(authData));
    saveDataToStorage(authData);
  };

export const invalidate = (): AppThunk => async (dispatch) => {
  SecureStore.deleteItemAsync(USER_DATA);
  dispatch(logout());
};
