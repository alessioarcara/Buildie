import { SETTINGS } from "@constants/PersistedData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppThunk } from ".";
import { setGameSpeed } from "./gameState";
import { setSettings, SettingsState } from "./settings";

const saveSettingsToStorage = async (settings: SettingsState) => {
  AsyncStorage.setItem(SETTINGS, JSON.stringify(settings));
};

export const saveSettings =
  ({ speed, sounds, haptics }: SettingsState & { speed: number }): AppThunk =>
  (dispatch) => {
    dispatch(setGameSpeed(speed));
    dispatch(setSettings({ sounds, haptics }));
    saveSettingsToStorage({ sounds, haptics });
  };
