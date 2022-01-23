import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, ProfileScreen } from "@screens";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

export type TabNavigatorParams = {
  Home: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParams>();

const RootNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarBackground: () => (
          <BlurView tint="dark" intensity={60} style={{ flex: 1 }} />
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home-outline" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-person-outline" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default RootNavigator;
