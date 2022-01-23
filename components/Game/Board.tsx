import { BOARD_WIDTH } from "../../models/Board";
import React, { useMemo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Cell from "./Cell";
import Piece, { PIECE_SIDE } from "../../models/Piece";

export const boardWidth = (Dimensions.get("window").width * 2) / 3;

type BoardProps = {
  currPiece: Piece;
  board: number[];
};

const drawPiece = (board: JSX.Element[], { shape, x, y }: Piece) => {
  let newBoard = [...board];

  for (let pyIndex = 0; pyIndex < PIECE_SIDE; pyIndex += 1)
    for (let pxIndex = 0; pxIndex < PIECE_SIDE; pxIndex += 1) {
      const bIndex = (y + pyIndex) * BOARD_WIDTH + (x + pxIndex);
      const pIndex = pyIndex * PIECE_SIDE + pxIndex;
      if (+shape[pIndex] !== 0)
        newBoard[bIndex] = <Cell type={+shape[pIndex]} key={bIndex} />;
    }

  return newBoard;
};

const Board = ({ currPiece, board }: BoardProps) => {
  const currBoard = useMemo(
    () =>
      board.map((type, idx) => {
        return <Cell type={type} key={idx} />;
      }),
    [board]
  );

  return (
    <View style={styles.gridContainer}>
      <View style={styles.grid}>{drawPiece(currBoard, currPiece)}</View>
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
