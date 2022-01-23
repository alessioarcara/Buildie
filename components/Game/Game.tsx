import { StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
import Board from "./Board";
import { useConst } from "@hooks/useConst";
import GameClass from "../../models/Game";
import useGameLoop from "@hooks/useGameLoop";

const Game = () => {
  const game = useConst(() => new GameClass(1));
  const [interpolate, setInterpolate] = useState<number>();

  const update = useCallback(() => {
    game.update();
  }, []);

  const gameLoop = useGameLoop(update, (time: number) => setInterpolate(time));

  return (
    <Board
      currPiece={game.boardPool[0].currPiece}
      board={Array.from(game.boardPool[0].board)}
    />
  );
};

export default Game;

const styles = StyleSheet.create({});
