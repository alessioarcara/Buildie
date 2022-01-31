import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import GameInfo from "./GameInfo";

type GameHeaderProps = {
  speed: number;
  lines: number;
  score: number;
};

const GameHeader = (props: GameHeaderProps) => {
  return (
    <View style={styles.gameHeader}>
      {Object.keys(props).map((prop) => (
        <GameInfo
          key={prop}
          title={prop.charAt(0).toUpperCase() + prop.slice(1)}
          info={props[prop]}
        />
      ))}
    </View>
  );
};

export default GameHeader;

const styles = StyleSheet.create({
  gameHeader: {
    flexDirection: "row",
    height: Dimensions.get("window").height * 0.13,
    width: "100%",
    borderBottomWidth: 2,
    borderColor: "#bbb",
    backgroundColor: "#000",
  },
});
