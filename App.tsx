import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import AppNavigator from "@config/AppNavigator";
import { AppBootstrap } from "@components";
import { init } from "./helpers/db";

init()
  .then(() => {
    console.log("Initialized db success.");
  })
  .catch((err) => {
    console.log("Initialized db failed.");
    console.log(err);
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
