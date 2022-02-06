import * as SecureStore from "expo-secure-store";
import { AuthData } from "../types/User";
import { AppThunk } from ".";
import { login, logout } from "./auth";
import { USER_DATA } from "@constants/PersistedData";

const saveUserDataToStorage = (userData: AuthData) => {
  SecureStore.setItemAsync(USER_DATA, JSON.stringify(userData));
};

export const authenticate =
  (authData: AuthData): AppThunk =>
  async (dispatch) => {
    dispatch(login(authData));
    saveUserDataToStorage(authData);
  };

export const invalidate = (): AppThunk => (dispatch) => {
  SecureStore.deleteItemAsync(USER_DATA);
  dispatch(logout());
};
