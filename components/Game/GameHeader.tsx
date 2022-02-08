import React from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  StatusBar,
  Platform,
} from "react-native";
import GameStatistic from "./GameStatistic";

type GameHeaderProps = {
  speed: number;
  lines: number;
  score: number;
};

const GameHeader = ({ speed, lines, score }: GameHeaderProps) => {
  return (
    <View style={styles.gameHeaderContainer}>
      <View style={styles.gameHeader}>
        <GameStatistic
          title="Level"
          statistic={speed}
          icon={require("../../assets/images/lvl.png")}
        />
        <GameStatistic
          title="Lines"
          statistic={lines}
          icon={require("../../assets/images/blocks.png")}
        />
        <GameStatistic
          title="Score"
          statistic={score}
          icon={require("../../assets/images/trophy.png")}
        />
      </View>
    </View>
  );
};

export default GameHeader;

const styles = StyleSheet.create({
  gameHeaderContainer: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#000",
  },
  gameHeader: {
    flexDirection: "row",
    height: Dimensions.get("window").height * 0.14,
    width: "100%",
    borderBottomWidth: 2,
    borderColor: "grey",
    backgroundColor: "#000",
  },
});
