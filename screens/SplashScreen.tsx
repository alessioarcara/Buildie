import { ActivityIndicator, Platform, View } from "react-native";
import React, { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { useAppDispatch } from "@store/hooks";
import { GradientBackground } from "@components";
import { setDidTryToLogin, login } from "@store/auth";
import defaultStyles from "@constants/defaultStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GAME_STATE, SETTINGS, USER_DATA } from "@constants/PersistedData";
import { setGameState } from "@store/gameState";
import { setSettings } from "@store/settings";

const SplashScreen = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // authSlice
    (async () => {
      let userData = null;
      if (Platform.OS !== "web") {
        userData = await SecureStore.getItemAsync(USER_DATA);
      }

      if (!userData) {
        dispatch(setDidTryToLogin());
        return;
      }
      dispatch(login(JSON.parse(userData)));
    })();

    // gameStateSlice
    (async () => {
      const gameState = await AsyncStorage.getItem(GAME_STATE);
      if (!gameState) return;
      dispatch(setGameState(JSON.parse(gameState)));
    })();

    // settingsSlice
    (async () => {
      const settings = await AsyncStorage.getItem(SETTINGS);
      if (!settings) return;
      dispatch(setSettings(JSON.parse(settings)));
    })();
  }, [dispatch]);

  return (
    <GradientBackground>
      <View style={defaultStyles.centered}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    </GradientBackground>
  );
};

export default SplashScreen;
