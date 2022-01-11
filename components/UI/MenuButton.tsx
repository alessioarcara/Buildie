import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  TouchableOpacityProps,
} from "react-native";

type MainButtonProps = {
  children: React.ReactNode;
  style?: ViewStyle;
} & TouchableOpacityProps;

const MenuButton = ({ children, style, ...props }: MainButtonProps) => {
  return (
    <TouchableOpacity activeOpacity={0.6} {...props}>
      <View style={[styles.button, style]}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MenuButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#192f6a",
    paddingVertical: 12,
    paddingHorizontal: 30,
    minWidth: 250,
    borderRadius: 25,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
  },
  buttonText: {
    color: "white",
    // fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
  },
});
