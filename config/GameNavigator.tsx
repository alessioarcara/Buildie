import React from "react";
import { GameoverScreen, SingleplayerScreen } from "@screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RootNavigator from "./RootNavigator";

export type StackNavigatorParams = {
  Root: undefined;
  Singleplayer: { gameId: string };
  Gameover: undefined;
  Multiplayer: undefined;
  Settings: undefined;
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
    </Stack.Navigator>
  );
};

export default GameNavigator;
