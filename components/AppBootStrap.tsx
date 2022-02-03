import React, { useState, ReactNode } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useAppDispatch } from "@store/hooks";

import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { USER_DATA } from "@store/authThunk";
import { GradientBackground } from "@components";
import { setDidTryToLogin, login } from "@store/auth";
import defaultStyles from "@constants/defaultStyles";
import { AuthData } from "@models/User";

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

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const userData = await SecureStore.getItemAsync(USER_DATA);
      if (!userData) {
        dispatch(setDidTryToLogin());
        return;
      }
      const transformedData = JSON.parse(userData) as AuthData;

      dispatch(login(transformedData));
    })();
  }, [dispatch]);

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
