import React, { useCallback, useEffect, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import GameClass from "@models/Game";
import Board from "./Board";
import useGameLoop from "@hooks/useGameLoop";
import Joystick from "./Joystick";
import useForceUpdate from "@hooks/useForceUpdate";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import GameHeader from "../UI/GameHeader";
import Piece from "./Piece";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorParams } from "@config/GameNavigator";
import IconButton from "../UI/IconButton";
import useSounds from "@hooks/useSounds";

type GameProps = {
  game: GameClass;
};

const Game = ({ game }: GameProps) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<StackNavigatorParams, "Singleplayer">
    >();
  const [playMusic, stopMusic, { isLoading, didFinish }] = useSounds();
  const draw = useForceUpdate();

  const handleInput = useCallback((keyCode: string) => {
    game.inputHandler(keyCode);
    draw();
  }, []);

  const update = useCallback(() => {
    game.update();
  }, []);

  const { start, stop } = useGameLoop(game.speed, update, draw);

  useFocusEffect(
    useCallback(() => {
      start();
      playMusic(game.speed);
      return () => {
        stop();
        stopMusic();
      };
    }, [game.speed])
  );

  useEffect(() => {
    if (!isLoading) {
      playMusic(game.speed);
    }
  }, [isLoading, didFinish]);

  useEffect(() => {
    if (game.gameOver) {
      navigation.navigate("Gameover");
    }
  }, [game.gameOver]);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <GameHeader speed={game.speed} lines={game.lines} score={game.score} />
      ),
    });
  }, [game.speed, game.lines, game.score]);

  return (
    <View style={styles.gameContainer}>
      <View style={styles.game}>
        <Board currPiece={game.currPiece} board={Array.from(game.board)} />
        <View style={{ alignItems: "center" }}>
          <Piece title="hold" piece={game.heldPiece} />
          <Piece title="next" piece={game.nextPiece} />
          <IconButton
            pressHandler={() => {
              navigation.navigate("Gameover");
            }}
            icon={require("../../assets/images/pause.png")}
          />
          <IconButton
            pressHandler={() => {
              game.reset();
              // start();
            }}
            icon={require("../../assets/images/replay.png")}
          />
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
