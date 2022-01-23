import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Board from "./Board";
import { useConst } from "@hooks/useConst";
import GameClass from "../../models/Game";
import useGameLoop from "@hooks/useGameLoop";

const Game = () => {
  const game = useConst(() => new GameClass(1));

  //   useGameLoop(game.update);

  useEffect(() => {
    game.update();
  });

  return <Board board={Array.from(game.boardPool[0].board)} />;
};

export default Game;

const styles = StyleSheet.create({});
