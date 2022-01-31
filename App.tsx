import React from "react";
import AppNavigator from "@config/AppNavigator";
import { AppBootstrap } from "@components";

export default function App() {
  return (
    <AppBootstrap>
      <AppNavigator />
    </AppBootstrap>
  );
}
