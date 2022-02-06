import React from "react";
import {
  GameoverScreen,
  Settings,
  LeaderboardScreen,
  SingleplayerScreen,
} from "@screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RootNavigator from "./RootNavigator";
import { appColors } from "@constants/Colors";
import { DefaultText } from "@components";

export type StackNavigatorParams = {
  Root: undefined;
  Singleplayer: undefined;
  Leaderboard: undefined;
  Settings: undefined;
  Gameover: undefined;
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
        name="Gameover"
        component={GameoverScreen}
        options={{
          presentation: "transparentModal",
          headerShown: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          headerStyle: { backgroundColor: appColors.primaryDark },
          headerTitleStyle: { fontSize: 24 },
          headerTintColor: appColors.white,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerStyle: { backgroundColor: appColors.primaryDark },
          headerTitleStyle: { fontSize: 24 },
          headerTintColor: appColors.white,
        }}
      />
    </Stack.Navigator>
  );
};

export default GameNavigator;
