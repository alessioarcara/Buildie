import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, ProfileScreen, AuthScreen } from "@screens";
import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useAppSelector } from "@store/hooks";

export type TabNavigatorParams = {
  Home: undefined;
  Profile: undefined;
  Login: undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParams>();

const RootNavigator = () => {
  const isSignedIn = useAppSelector((state) => !!state.auth.accessToken);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontFamily: "dogbyte",
          paddingBottom: 5,
        },
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "#bbb",
        tabBarBackground: () => (
          <BlurView tint="dark" intensity={40} style={{ flex: 1 }} />
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      {isSignedIn ? (
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name="user" size={size} color={color} />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="Login"
          component={AuthScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name="sign-in" size={size} color={color} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default RootNavigator;
