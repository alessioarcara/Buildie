import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SettingsState = {
  sounds: boolean;
  haptics: boolean;
};

const initialState: SettingsState = {
  sounds: false,
  haptics: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (_, { payload }: PayloadAction<SettingsState>) => payload,
  },
});

export const { setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
