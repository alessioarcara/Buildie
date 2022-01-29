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

const Game = () => {
  const navigation = useNavigation();
  const game = useConst(() => new GameClass(1, 1));

  const draw = useForceUpdate();

  const handleInput = useCallback((keyCode: string) => {
    game.playerPool[0].currPiece?.inputHandler(keyCode);
    draw();
  }, []);

  const update = useCallback(() => {
    game.update();
  }, []);

  const gameLoop = useGameLoop(game.playerPool[0].speed, update, draw);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <GameHeader
          speed={game.playerPool[0].speed}
          lines={game.playerPool[0].nlines}
          score={game.playerPool[0].score}
        />
      ),
    });
  }, [game.playerPool[0].speed, game.playerPool[0].nlines]);

  return (
    <View style={styles.game}>
      <Board
        currPiece={game.playerPool[0].currPiece}
        board={Array.from(game.playerPool[0].board)}
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
    justifyContent: "flex-end",
  },
});
