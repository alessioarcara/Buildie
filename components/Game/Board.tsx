import React, { useMemo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Cell from "./Cell";
import Piece from "@models/Piece";
import BoardClass from "@models/Board";

export const boardWidth = (Dimensions.get("window").width * 2) / 3;

type BoardProps = {
  currPiece: Piece;
  board: number[];
};

const drawPiece = (board: JSX.Element[], piece: Piece) => {
  let newBoard = [...board];

  for (let pyIndex = 0; pyIndex < Piece.w; pyIndex += 1)
    for (let pxIndex = 0; pxIndex < Piece.w; pxIndex += 1) {
      const bIndex = (piece.y + pyIndex) * BoardClass.w + (piece.x + pxIndex);
      const pIndex = piece.rotate(pxIndex, pyIndex, piece.r)!;
      if (+piece.shape[pIndex] !== 0)
        newBoard[bIndex] = <Cell type={+piece.shape[pIndex]} key={bIndex} />;
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
    // height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    width: boardWidth,
    // height: (Dimensions.get("window").height * 2) / 3,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
