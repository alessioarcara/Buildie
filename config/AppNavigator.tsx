import React, { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import GameNavigator, { StackNavigatorParams } from "./GameNavigator";
import { SplashScreen } from "@screens";
import { useAppSelector } from "@store/hooks";
import { NavigationContainerRef } from "@react-navigation/native";
import * as Notifications from "expo-notifications";

const AppNavigator = () => {
  const navigationRef =
    useRef<NavigationContainerRef<StackNavigatorParams> | null>(null);
  const didTryToLogin = useAppSelector((state) => !!state.auth.didTryLogin);
  const isSignedIn = useAppSelector((state) => !!state.auth.accessToken);

  useEffect(() => {
    if (isSignedIn) {
      const subscription =
        Notifications.addNotificationResponseReceivedListener((response) => {
          const data = response.notification.request.content.data;
          if ("gameId" in data && typeof data.gameId === "string") {
            navigationRef.current?.navigate("MultiplayerGame", {
              gameId: data.gameId,
            });
          }
        });

      return () => {
        subscription.remove();
      };
    }
  }, [isSignedIn]);

  return (
    <NavigationContainer ref={navigationRef}>
      {!didTryToLogin ? <SplashScreen /> : <GameNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
