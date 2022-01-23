import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import { BOARD_WIDTH } from "../../models/Board";
import { squareColors } from "../../constants/Colors";
// import { boardWidth } from "./Board";

export const boardWidth = (Dimensions.get("window").width * 2) / 3;

type CellProps = {
  type: number;
};

const Cell = ({ type }: CellProps) => {
  return (
    <View
      style={{
        ...styles.cell,
        ...{
          backgroundColor: squareColors[type],
          borderWidth: type === 0 ? 1 : 4,
        },
      }}
    />
  );
};

export default React.memo(Cell);

const styles = StyleSheet.create({
  cell: {
    width: Math.floor(boardWidth / BOARD_WIDTH),
    height: Math.floor(boardWidth / BOARD_WIDTH),
    borderBottomColor: "rgba(0, 0, 0, 0.5)",
    borderRightColor: "rgba(0, 0, 0, 0.15)",
    borderTopColor: "rgba(255, 255, 255, 0.33)",
    borderLeftColor: "rgba(255, 255, 255, 0.20)",
  },
});
