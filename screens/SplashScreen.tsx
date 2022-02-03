import { ActivityIndicator, View } from "react-native";
import React, { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { useAppDispatch } from "@store/hooks";
import { USER_DATA } from "@store/authThunk";
import { GradientBackground } from "@components";
import { setDidTryToLogin, login } from "@store/auth";
import defaultStyles from "@constants/defaultStyles";

const SplashScreen = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const userData = await SecureStore.getItemAsync(USER_DATA);
      if (!userData) {
        dispatch(setDidTryToLogin());
        return;
      }
      const transformedData = JSON.parse(userData);

      dispatch(login(transformedData));
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
