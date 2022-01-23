import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Cell from "./Cell";

export const boardWidth = (Dimensions.get("window").width * 2) / 3;

type BoardProps = {
  board: number[];
};

const Board = ({ board }: BoardProps) => {
  return (
    <View style={styles.gridContainer}>
      <View style={styles.grid}>
        {board.map((type, idx) => (
          <Cell type={type} key={idx} />
        ))}
      </View>
    </View>
  );
};

export default Board;

const styles = StyleSheet.create({
  gridContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    width: boardWidth,
    height: (Dimensions.get("window").height * 2) / 3,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
