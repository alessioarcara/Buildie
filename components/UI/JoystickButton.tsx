import React from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

type JoystickButtonProps = {
  pressHandler: () => void;
  icon: keyof typeof Ionicons.glyphMap;
};

const JoystickButton = ({ pressHandler, icon }: JoystickButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        Haptics.selectionAsync();
        pressHandler();
      }}
      style={styles.joystickButton}
    >
      <Ionicons name={icon} size={50} />
    </TouchableOpacity>
  );
};

export default JoystickButton;

const styles = StyleSheet.create({
  joystickButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    width: 75,
    height: 75,
    borderRadius: 50,
  },
});
