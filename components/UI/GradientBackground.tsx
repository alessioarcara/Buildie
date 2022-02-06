import { appColors } from "@constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";

type GradientBackgroundProps = {
  children: React.ReactNode;
};

const GradientBackground = ({ children }: GradientBackgroundProps) => {
  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <LinearGradient
        style={styles.background}
        colors={[
          appColors.primaryLight,
          appColors.primary,
          appColors.primaryDark,
        ]}
      />
      {children}
    </View>
  );
};

export default GradientBackground;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
