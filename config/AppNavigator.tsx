import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import GameNavigator from "./GameNavigator";
import { SplashScreen } from "@screens";
import { useAppSelector } from "@store/hooks";

const AppNavigator = () => {
  const didTryToLogin = useAppSelector((state) => !!state.auth.didTryLogin);
  return (
    <NavigationContainer>
      {!didTryToLogin ? <SplashScreen /> : <GameNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
