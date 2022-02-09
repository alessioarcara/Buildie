import React from "react";
import { DefaultText, AnimatedBackground, DefaultButton } from "@components";
import { StackNavigatorParams } from "@config/GameNavigator";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, StyleSheet } from "react-native";
import { appColors, squareColors } from "@constants/Colors";
import { useAppSelector } from "@store/hooks";

type HomeProps = {
  navigation: NativeStackNavigationProp<StackNavigatorParams, "Root">;
};

const logo = "Buildie";

const Home = ({ navigation }: HomeProps) => {
  const tabBarHeight = useBottomTabBarHeight();
  const isSignedIn = useAppSelector((state) => !!state.auth.accessToken);
  const activeGame = useAppSelector((state) => !!state.game.initialBoard);

  return (
    <AnimatedBackground>
      <View style={{ marginBottom: tabBarHeight, ...styles.list }}>
        <DefaultText style={styles.logo}>
          {[...logo].map((char, idx) => (
            <Text
              style={{ color: squareColors[idx + 1] }}
              key={`${char}_${idx}`}
            >
              {char}
            </Text>
          ))}
        </DefaultText>
        <DefaultButton
          style={styles.homeButton}
          onPress={() => {
            navigation.navigate("Singleplayer");
          }}
        >
          {activeGame ? "Resume" : "New game"}
        </DefaultButton>
        <DefaultButton
          style={styles.homeButton}
          onPress={() => {
            navigation.navigate("Leaderboard");
          }}
        >
          Leaderboard
        </DefaultButton>
        <DefaultButton
          style={styles.homeButton}
          disabled={!isSignedIn}
          onPress={() => {
            navigation.navigate("MultiplayerLobby");
          }}
        >
          Multiplayer
        </DefaultButton>
        <DefaultButton
          style={styles.homeButton}
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
          Settings
        </DefaultButton>
      </View>
    </AnimatedBackground>
  );
};

const styles = StyleSheet.create({
  logo: {
    fontSize: 100,
    color: "white",
  },
  list: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  homeButton: {
    backgroundColor: appColors.primaryDark,
    minWidth: 250,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
  },
});

export default Home;
