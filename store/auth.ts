import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthData } from "../types/User";

export type AuthState = {
  userId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  didTryLogin: boolean;
};

const initialState: AuthState = {
  userId: null,
  accessToken: null,
  refreshToken: null,
  didTryLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setDidTryToLogin: (state) => ({
      ...state,
      didTryLogin: true,
    }),
    login: (
      _,
      {
        payload: { userId, accessToken, refreshToken },
      }: PayloadAction<AuthData>
    ) => ({
      userId,
      accessToken,
      refreshToken,
      didTryLogin: true,
    }),
    logout: () => ({
      ...initialState,
      didTryLogin: true,
    }),
  },
});

export const { login, logout, setDidTryToLogin } = authSlice.actions;
export default authSlice.reducer;
