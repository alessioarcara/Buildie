import { StyleSheet, View } from "react-native";
import React from "react";
import { squareColors } from "@constants/Colors";

type CellProps = {
  type: number;
  width: number;
  border?: boolean;
};

const Cell = ({ type, width, border }: CellProps) => {
  return (
    <View
      style={{
        ...styles.cell,
        ...{
          borderBottomWidth: border ? 2 : 0,
          borderColor: border ? "black" : "",
          width,
          height: width,
          backgroundColor: squareColors[type],
        },
      }}
    />
  );
};

export default React.memo(Cell);

const styles = StyleSheet.create({
  cell: {
    // borderBottomWidth: 2,
    // borderColor: "black",
    // borderBottomColor: "rgba(0, 0, 0, 0.5)",
    // borderRightColor: "rgba(0, 0, 0, 0.15)",
    // borderTopColor: "rgba(255, 255, 255, 0.33)",
    // borderLeftColor: "rgba(255, 255, 255, 0.20)",
  },
});
