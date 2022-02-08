import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { GameMode } from "screens/LeaderboardScreen";
import DefaultButton from "../UI/DefaultButton";
import DefaultText from "../UI/DefaultText";

type LeaderboardHeaderProps = {
  gameMode: GameMode;
  setGameModeHandler: (gameMode: GameMode) => void;
};

const LeaderboardHeader = ({
  gameMode,
  setGameModeHandler,
}: LeaderboardHeaderProps) => {
  return (
    <View style={styles.leaderboardHeaderContainer}>
      <View style={styles.leaderboardHeader}>
        <View style={styles.titleContainer}>
          <DefaultText style={styles.title}>HIGHSCORES</DefaultText>
        </View>
        <View style={styles.gameModeContainer}>
          <DefaultButton
            style={[
              styles.gameMode,
              gameMode === "LOCAL" && styles.selectedGameMode,
            ]}
            textStyle={{ color: gameMode === "LOCAL" ? "black" : "white" }}
            onPress={() => {
              setGameModeHandler("LOCAL");
            }}
          >
            LOCAL
          </DefaultButton>
          <DefaultButton
            style={[
              styles.gameMode,
              gameMode === "ONLINE" && styles.selectedGameMode,
            ]}
            textStyle={{ color: gameMode === "ONLINE" ? "black" : "white" }}
            onPress={() => {
              setGameModeHandler("ONLINE");
            }}
          >
            ONLINE
          </DefaultButton>
        </View>
      </View>
    </View>
  );
};

export default React.memo(LeaderboardHeader);

const styles = StyleSheet.create({
  leaderboardHeaderContainer: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#000",
  },
  leaderboardHeader: {
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#000",
    height: Dimensions.get("window").height * 0.2,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 60,
  },
  gameModeContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  gameMode: {
    flex: 1,
    backgroundColor: "black",
  },
  selectedGameMode: {
    backgroundColor: "white",
    borderRadius: 10,
  },
});
