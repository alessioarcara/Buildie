import React from "react";
import { StyleSheet, Text, TextStyle } from "react-native";

type DefaultTextProps = {
  children: React.ReactNode;
  style?: TextStyle;
};

const DefaultText = ({ children, style }: DefaultTextProps) => {
  return <Text style={{ ...styles.text, ...style }}>{children}</Text>;
};

export default DefaultText;

const styles = StyleSheet.create({
  text: {
    fontFamily: "dogbyte",
  },
});
