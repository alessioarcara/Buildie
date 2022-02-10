import React, { useEffect, useLayoutEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import GameClass from "@models/Game";
import Board from "../Game/Board";
import Joystick from "../Game/Joystick";
import { useNavigation } from "@react-navigation/native";
import GameHeader from "../Game/GameHeader";
import Piece from "../Game/Piece";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorParams } from "@config/GameNavigator";
import useSounds from "@hooks/useSounds";

type GameProps = {
  game: GameClass;
  children: React.ReactNode;
  handleInput: (keyCode: string) => void;
};

const boardWidth = Dimensions.get("window").height * 0.3;

const MultiplayerGame = ({ game, children, handleInput }: GameProps) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<StackNavigatorParams, "Singleplayer">
    >();
  const [playMusic, _, { isLoading, didFinish }] = useSounds();

  useEffect(() => {
    if (!isLoading) {
      playMusic(game.speed);
    }
  }, [isLoading, didFinish]);

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
        <Board
          currPiece={game.currPiece}
          board={Array.from(game.board)}
          boardWidth={boardWidth}
          border
        />
        <View style={styles.sidePanel}>
          <Piece title="hold" piece={game.heldPiece} />
          <Piece title="next" piece={game.nextPiece} />
          {children}
        </View>
      </View>
      <Joystick handleInput={handleInput} />
    </View>
  );
};

export default MultiplayerGame;

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
  sidePanel: {
    marginLeft: 5,
    alignItems: "center",
  },
});
