import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ViewStyle,
  TouchableOpacityProps,
  TextStyle,
} from "react-native";
import DefaultText from "./DefaultText";

type MainButtonProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
} & TouchableOpacityProps;

const DefaultButton = ({
  children,
  style,
  textStyle,
  ...props
}: MainButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      activeOpacity={0.6}
      {...props}
    >
      <View style={styles.buttonTextContainer}>
        {props.disabled && (
          <View style={styles.lineContainer}>
            <View style={styles.line} />
          </View>
        )}
        <DefaultText style={{ ...styles.buttonText, ...textStyle }}>
          {children}
        </DefaultText>
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
