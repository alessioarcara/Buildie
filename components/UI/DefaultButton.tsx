import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ViewStyle,
  TouchableOpacityProps,
} from "react-native";
import DefaultText from "./DefaultText";

type MainButtonProps = {
  children: React.ReactNode;
  style?: ViewStyle;
} & TouchableOpacityProps;

const DefaultButton = ({ children, style, ...props }: MainButtonProps) => {
  return (
    <TouchableOpacity activeOpacity={0.6} {...props}>
      <View style={[styles.button, style]}>
        <View style={styles.buttonTextContainer}>
          {props.disabled && (
            <View style={styles.lineContainer}>
              <View style={styles.line} />
            </View>
          )}
          <DefaultText style={styles.buttonText}>{children}</DefaultText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DefaultButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  lineContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    zIndex: 1,
  },
  line: {
    borderBottomWidth: 4,
    borderColor: "red",
  },
  buttonTextContainer: {
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    paddingVertical: 5,
    fontSize: 26,
  },
});
