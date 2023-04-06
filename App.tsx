import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import AppNavigator from "@config/AppNavigator";
import { AppBootstrap } from "@components";
import { init } from "./helpers/db";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

if (Platform.OS !== "web") {
  init()
    .then(() => {
      console.log("Initialized db success.");
    })
    .catch((err) => {
      console.log("Initialized db failed.");
      console.log(err);
    });
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  return (
    <Provider store={store}>
      <AppBootstrap>
        <AppNavigator />
      </AppBootstrap>
    </Provider>
  );
}
