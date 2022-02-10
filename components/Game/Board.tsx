import React, { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Cell from "./Cell";
import Piece from "@models/Piece";
import BoardClass from "@models/Board";

type BoardProps = {
  currPiece?: Piece | null;
  board: number[];
  boardWidth: number;
  border?: boolean;
};

const Board = ({ currPiece, board, boardWidth, border }: BoardProps) => {
  const cellWidth = useMemo(() => Math.floor(boardWidth / BoardClass.w), []);

  const currBoard = useMemo(
    () =>
      board.map((type, idx) => {
        return (
          <Cell
            key={`b_${idx}`}
            type={type}
            width={cellWidth}
            border={border}
          />
        );
      }),
    [board]
  );

  const drawPiece = useCallback(
    (board: JSX.Element[], piece: Piece, piece_y: number, isGhost = false) => {
      for (let pyIndex = 0; pyIndex < Piece.w; pyIndex += 1)
        for (let pxIndex = 0; pxIndex < Piece.w; pxIndex += 1) {
          const bIndex =
            (piece_y + pyIndex) * BoardClass.w + (piece.x + pxIndex);
          const pIndex = piece.rotate(pxIndex, pyIndex, piece.r)!;
          if (+piece.shape[pIndex] !== 0)
            board[bIndex] = (
              <Cell
                key={`b_${bIndex}`}
                type={isGhost ? 8 : +piece.shape[pIndex]}
                width={cellWidth}
                border={border}
              />
            );
        }
    },
    []
  );

  const fillBoard = useCallback((board: JSX.Element[], piece: Piece) => {
    let newBoard = [...board];

    let ghost_y = null;
    for (let bIndex = BoardClass.h - 2; bIndex > piece.y; bIndex -= 1) {
      if (!piece.collides(piece.x, bIndex)) continue;
      ghost_y = bIndex - 1;
    }

    // ghost piece
    ghost_y && drawPiece(newBoard, piece, ghost_y, true);
    // piece
    drawPiece(newBoard, piece, piece.y);

    return newBoard;
  }, []);

  return (
    <View style={styles.gridContainer}>
      <View style={{ ...styles.grid, width: boardWidth }}>
        {currPiece ? fillBoard(currBoard, currPiece) : currBoard}
      </View>
    </View>
  );
};

export default Board;

const styles = StyleSheet.create({
  gridContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
