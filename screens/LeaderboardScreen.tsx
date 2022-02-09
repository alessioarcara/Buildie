import { StyleSheet, View, FlatList } from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  DefaultButton,
  LeaderboardHeader,
  ScoreItem,
  ScoreListHeader,
} from "@components";
import { useScoresQuery } from "../services/gameApi";
import { StackNavigatorParams } from "@config/GameNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScoreData } from "types/Score";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { loadScores } from "@store/scores";

type LeaderboardScreenProps = {
  navigation: NativeStackNavigationProp<StackNavigatorParams, "Leaderboard">;
};

export type GameMode = "LOCAL" | "ONLINE";

const LeaderboardScreen = ({ navigation }: LeaderboardScreenProps) => {
  const [gameMode, setGameMode] = useState<GameMode>("LOCAL");
  const listRef = useRef<FlatList>(null);
  const localScores = useAppSelector((state) => state.scores.localScores);
  const userId = useAppSelector((state) => state.auth.userId);
  const { data: onlineScores } = useScoresQuery();
  const dispatch = useAppDispatch();

  const setGameModeHandler = useCallback((gameMode: GameMode) => {
    setGameMode(gameMode);
    listRef.current?.scrollToOffset({ animated: true, offset: 0 });
  }, []);

  const renderScoreItem = useCallback(
    ({ item, index }: { item: ScoreData; index: number }) => {
      return (
        <ScoreItem
          rank={index + 1}
          score={item.score}
          name={item.username}
          me={item._id === userId}
        />
      );
    },
    [userId]
  );

  useEffect(() => {
    dispatch(loadScores());
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <LeaderboardHeader
          gameMode={gameMode}
          setGameModeHandler={setGameModeHandler}
        />
      ),
    });
  }, [gameMode]);

  return (
    <View style={styles.leaderboardContainer}>
      <FlatList
        ref={listRef}
        data={gameMode === "LOCAL" ? localScores : onlineScores}
        keyExtractor={(item) => item._id}
        renderItem={renderScoreItem}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={<ScoreListHeader />}
      />
      <DefaultButton
        onPress={() => {
          navigation.goBack();
        }}
        textStyle={styles.button}
      >
        CLOSE
      </DefaultButton>
    </View>
  );
};

export default LeaderboardScreen;

const styles = StyleSheet.create({
  leaderboardContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  button: {
    fontSize: 50,
  },
});
