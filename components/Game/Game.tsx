import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import Board from "./Board";
import { useConst } from "@hooks/useConst";
import GameClass from "@models/Game";
import useGameLoop from "@hooks/useGameLoop";
import Joystick from "./Joystick";
import { useForceUpdate } from "@hooks/useForceUpdate";

const Game = () => {
  const game = useConst(() => new GameClass(1));

  const handleInput = useCallback((keyCode: string) => {
    game.piecePool[0].currPiece?.inputHandler(keyCode);
  }, []);

  const update = useCallback(() => {
    game.update();
  }, []);

  const draw = useForceUpdate();

  const gameLoop = useGameLoop(update, draw);

  return (
    <View style={styles.game}>
      <Board
        currPiece={game.piecePool[0].currPiece!}
        board={Array.from(game.boardPool[0].board)}
      />
      <Joystick handleInput={handleInput} />
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  game: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});
