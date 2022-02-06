import React, { useState, ReactNode } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

type AppBootstrapProps = {
  children: ReactNode;
};

const fetchFonts = () => {
  return Font.loadAsync({
    dogbyte: require("../assets/fonts/dogbyte.otf"),
  });
};

const AppBootstrap = ({ children }: AppBootstrapProps) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  return fontLoaded ? (
    <>{children}</>
  ) : (
    <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
      onError={(err) => console.log(err)}
    />
  );
};

export default AppBootstrap;
