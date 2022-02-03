import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import AppNavigator from "@config/AppNavigator";
import { AppBootstrap } from "@components";

export default function App() {
  return (
    <Provider store={store}>
      <AppBootstrap>
        <AppNavigator />
      </AppBootstrap>
    </Provider>
  );
}
