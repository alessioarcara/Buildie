import { GradientBackground, Game, IconButton } from "@components";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import React, { useCallback, useEffect, useRef } from "react";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setGameState } from "@store/gameState";
import useConst from "@hooks/useConst";
import GameClass from "@models/Game";
import { useFocusEffect } from "@react-navigation/native";
import { SerializedGameState } from "../types/Game";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorParams } from "@config/GameNavigator";

const serializeGameState = (
  board: Uint8Array,
  speed: number,
  lines: number,
  score: number,
  nextPiece: string,
  currPiece?: string,
  heldPiece?: string
): SerializedGameState => {
  return {
    initialBoard: Array.from(board),
    initialIndexCurrPiece:
      (currPiece && +currPiece.replace(/^0+/, "")[0]) || undefined,
    initialIndexHeldPiece:
      (heldPiece && +heldPiece.replace(/^0+/, "")[0]) || undefined,
    initialIndexNextPiece:
      (nextPiece && +nextPiece.replace(/^0+/, "")[0]) || undefined,
    initialSpeed: speed,
    initialLines: lines,
    initialScore: score,
  };
};

type SingleplayerScreenProps = {
  navigation: NativeStackNavigationProp<StackNavigatorParams, "Singleplayer">;
};

const SingleplayerScreen = ({ navigation }: SingleplayerScreenProps) => {
  const {
    initialBoard,
    initialIndexCurrPiece,
    initialIndexHeldPiece,
    initialIndexNextPiece,
    initialSpeed,
    initialLines,
    initialScore,
  } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const appState = useRef(AppState.currentState);

  const game = useConst(
    () =>
      new GameClass({
        initialBoard: initialBoard && Uint8Array.from(initialBoard),
        initialIndexCurrPiece,
        initialIndexHeldPiece,
        initialIndexNextPiece,
        initialSpeed,
        initialLines,
        initialScore,
      })
  );

  const saveGameStateToStorage = () => {
    AsyncStorage.setItem(
      "gameState",
      JSON.stringify(
        serializeGameState(
          game.board,
          game.speed,
          game.lines,
          game.score,
          game.nextPiece,
          game.currPiece?.shape,
          game.heldPiece
        )
      )
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

  const handlePause = useCallback(() => {
    navigation.navigate("GameModal", { gameOver: false });
  }, []);

  useFocusEffect(() => {
    return () => {
      dispatch(
        setGameState(
          serializeGameState(
            game.board,
            game.speed,
            game.lines,
            game.score,
            game.nextPiece,
            game.currPiece?.shape,
            game.heldPiece
          )
        )
      );
    };
  });

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  return (
    <GradientBackground>
      <Game game={game}>
        <IconButton
          pressHandler={handlePause}
          icon={require("../assets/images/pause.png")}
        />
      </Game>
    </GradientBackground>
  );
};

export default SingleplayerScreen;
