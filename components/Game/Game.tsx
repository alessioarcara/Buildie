import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  AppState,
} from "react-native";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const Game = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<StackNavigatorParams, "Singleplayer">
    >();
  const appState = useRef(AppState.currentState);
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

  const saveGameStateToStorage = () => {
    AsyncStorage.setItem(
      "gameState",
      JSON.stringify({
        board: game.board,
        currPiece: game.currPiece,
        heldPiece: game.heldPiece,
        nextPiece: game.nextPiece,
      })
    );
  };

  const handleAppStateChange = useCallback((nextAppState) => {
    if (
      appState.current === "active" &&
      nextAppState.match(/inactive|background/)
    ) {
      saveGameStateToStorage();
    }
    appState.current = nextAppState;
  }, []);

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

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
