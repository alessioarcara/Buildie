import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

type JoystickButtonProps = {
  pressHandler: () => void;
  icon: keyof typeof FontAwesome.glyphMap;
  feedback?: "light" | "medium";
};

const JoystickButton = ({
  pressHandler,
  icon,
  feedback = "light",
}: JoystickButtonProps) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => {
          feedback === "medium"
            ? Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
            : Haptics.selectionAsync();
          pressHandler();
        }}
        style={styles.joystickButton}
      >
        <FontAwesome name={icon} size={24} color="rgba(0,0,0, 0.8)" />
      </TouchableOpacity>
    </View>
  );
};

export default JoystickButton;

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  joystickButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 30,
    shadowRadius: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
});
