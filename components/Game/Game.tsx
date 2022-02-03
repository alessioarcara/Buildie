import React, { useCallback, useLayoutEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import Board from "./Board";
import useConst from "@hooks/useConst";
import GameClass from "@models/Game";
import useGameLoop from "@hooks/useGameLoop";
import Joystick from "./Joystick";
import useForceUpdate from "@hooks/useForceUpdate";
import { useNavigation } from "@react-navigation/native";
import GameHeader from "../UI/GameHeader";
import Piece from "./Piece";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorParams } from "@config/GameNavigator";

const Game = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<StackNavigatorParams, "Singleplayer">
    >();
  const game = useConst(() => new GameClass());

  const draw = useForceUpdate();

  const handleInput = useCallback((keyCode: string) => {
    game.inputHandler(keyCode);
    draw();
  }, []);

  const update = useCallback(() => {
    game.update();
  }, []);

  const { start, stop } = useGameLoop(game.speed, update, draw);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <GameHeader speed={game.speed} lines={game.nlines} score={game.score} />
      ),
    });
  }, [game.speed, game.nlines, game.score]);

  useLayoutEffect(() => {
    start();
    return () => {
      stop();
    };
  }, []);

  return (
    <View style={styles.gameContainer}>
      <View style={styles.game}>
        <Board currPiece={game.currPiece} board={Array.from(game.board)} />
        <View style={{ alignItems: "center" }}>
          <Piece title="hold" piece={game.heldPiece} />
          <Piece title="next" piece={game.nextPiece} />
          <TouchableOpacity
            onPress={() => {
              stop();
              navigation.navigate("Gameover");
            }}
            style={{
              width: 50,
              height: 50,
            }}
          >
            <Image
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
              source={require("../../assets/images/pause.png")}
            />
          </TouchableOpacity>
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
