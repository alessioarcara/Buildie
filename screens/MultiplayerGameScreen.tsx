import { Alert, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useMemo } from "react";
import { Board, GradientBackground, MultiplayerGame } from "@components";
import { useGameQuery, useUpdateGameMutation } from "../services/gameApi";
import { RouteProp } from "@react-navigation/native";
import { StackNavigatorParams } from "@config/GameNavigator";
import useConst from "@hooks/useConst";
import GameClass from "@models/Game";
import useGameLoop from "@hooks/useGameLoop";
import useForceUpdate from "@hooks/useForceUpdate";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppSelector } from "@store/hooks";

type MultiplayerGameScreenProps = {
  navigation: NativeStackNavigationProp<
    StackNavigatorParams,
    "MultiplayerGame"
  >;
  route: RouteProp<StackNavigatorParams, "MultiplayerGame">;
};

const MultiplayerGameScreen = ({
  navigation,
  route,
}: MultiplayerGameScreenProps) => {
  const { data: sharedGame } = useGameQuery(route.params.gameId);
  const userId = useAppSelector((state) => state.auth.userId);

  const [updateGame] = useUpdateGameMutation();

  const game = useConst(() => new GameClass({}));

  const draw = useForceUpdate();

  const update = useCallback(() => {
    game.update();
    updateGame({
      gameId: route.params.gameId,
      gameOver: game.gameOver,
      playerBoard: Array.from(game.board),
    });
  }, []);

  const { start, stop } = useGameLoop(game.speed, update, draw);

  useEffect(() => {
    if (sharedGame?.gameStatus === "STARTED") {
      start();
    }
    if (sharedGame?.gameStatus === "FINISHED") {
      stop();
      Alert.alert("Game over", `${sharedGame.winner} win!`, [
        {
          text: "Home",
          onPress: () => navigation.navigate("Root"),
          style: "destructive",
        },
      ]);
    }
  }, [sharedGame?.gameStatus]);

  useEffect(() => {
    updateGame({
      gameId: route.params.gameId,
      gameOver: game.gameOver,
      playerBoard: Array.from(game.board),
    });

    return () => {
      updateGame({
        gameId: route.params.gameId,
        gameOver: true,
        playerBoard: Array.from(game.board),
      });
    };
  }, []);

  const handleInput = useCallback((keyCode: string) => {
    game.inputHandler(keyCode);
    draw();
  }, []);

  /**
   * TODO: not scalable, check for other solution later
   * ideally we want to have many opponent boards as number of players.
   */
  const opponentBoard = useMemo(
    () =>
      sharedGame?.players.filter((player) => player.user !== userId)[0].board ??
      [],
    [sharedGame]
  );

  return (
    <GradientBackground>
      <MultiplayerGame
        game={game}
        handleInput={handleInput}
        children={<Board board={opponentBoard} boardWidth={75} />}
      />
    </GradientBackground>
  );
};

export default MultiplayerGameScreen;

const styles = StyleSheet.create({});
