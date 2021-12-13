import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Home, SinglePlayer } from "@screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type StackNavigatorParams = {
  Home: undefined;
  SinglePlayer: { gameId: string };
};

const Stack = createNativeStackNavigator<StackNavigatorParams>();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SinglePlayer" component={SinglePlayer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
