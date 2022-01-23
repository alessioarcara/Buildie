import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SingleplayerScreen } from "@screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RootNavigator from "./RootNavigator";

export type StackNavigatorParams = {
  Root: undefined;
  Singleplayer: { gameId: string };
  Multiplayer: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<StackNavigatorParams>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={RootNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Singleplayer" component={SingleplayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
