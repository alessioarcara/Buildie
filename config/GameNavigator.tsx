import React from "react";
import {
  GameModalScreen,
  LeaderboardScreen,
  SingleplayerScreen,
  SettingsScreen,
} from "@screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RootNavigator from "./RootNavigator";
import { appColors } from "@constants/Colors";

export type StackNavigatorParams = {
  Root: undefined;
  Singleplayer: undefined;
  Leaderboard: undefined;
  Settings: undefined;
  GameModal: { gameOver: boolean };
};

const Stack = createNativeStackNavigator<StackNavigatorParams>();

const GameNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={RootNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Singleplayer" component={SingleplayerScreen} />
      <Stack.Screen
        name="GameModal"
        component={GameModalScreen}
        options={{
          presentation: "transparentModal",
          headerShown: false,
          animation: "none",
        }}
      />
      <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: "SETTINGS",
          headerStyle: { backgroundColor: appColors.primaryDark },
          headerTitleStyle: { fontSize: 24, fontFamily: "dogbyte" },
          headerTintColor: appColors.white,
        }}
      />
    </Stack.Navigator>
  );
};

export default GameNavigator;
