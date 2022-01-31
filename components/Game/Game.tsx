import React, { useCallback, useLayoutEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Board from "./Board";
import { useConst } from "@hooks/useConst";
import GameClass from "@models/Game";
import useGameLoop from "@hooks/useGameLoop";
import Joystick from "./Joystick";
import { useForceUpdate } from "@hooks/useForceUpdate";
import { useNavigation } from "@react-navigation/native";
import GameHeader from "../UI/GameHeader";
import Hold from "./Hold";

const Game = () => {
  const navigation = useNavigation();
  const game = useConst(() => new GameClass());

  const draw = useForceUpdate();

  const handleInput = useCallback((keyCode: string) => {
    game.inputHandler(keyCode);
    draw();
  }, []);

  const update = useCallback(() => {
    game.update();
  }, []);

  const gameLoop = useGameLoop(game.speed, update, draw);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <GameHeader speed={game.speed} lines={game.nlines} score={game.score} />
      ),
    });
  }, [game.speed, game.nlines, game.score]);

  return (
    <View style={styles.gameContainer}>
      <View style={styles.game}>
        <Board currPiece={game.currPiece} board={Array.from(game.board)} />
        <View>
          <Hold label="Hold" heldPiece={game.heldPiece} />
          <Hold label="Next" heldPiece={game.nextPiece} />
        </View>
      </View>
      <Joystick handleInput={handleInput} />
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  gameContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  game: {
    flexDirection: "row",
  },
});
