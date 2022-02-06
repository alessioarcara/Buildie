import React from "react";
import { DefaultText, AnimatedBackground, DefaultButton } from "@components";
import { StackNavigatorParams } from "@config/GameNavigator";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, StyleSheet } from "react-native";
import { appColors, squareColors } from "@constants/Colors";
import { useAppSelector } from "@store/hooks";

const menuOptions = ["Singleplayer", "Leaderboard", "Settings"];

type HomeProps = {
  navigation: NativeStackNavigationProp<StackNavigatorParams, "Root">;
};

const logo = "Buildie";

const Home = ({ navigation }: HomeProps) => {
  const tabBarHeight = useBottomTabBarHeight();
  const isSignedIn = false;
  const activeGame = useAppSelector((state) => !!state.game);

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
        {menuOptions.map((menuOption: any) => (
          <DefaultButton
            key={menuOption}
            style={styles.homeButton}
            disabled={menuOption === "Multiplayer" && !isSignedIn}
            onPress={() => {
              navigation.navigate(menuOption);
            }}
          >
            {menuOption === "Singleplayer" && activeGame
              ? "Resume"
              : menuOption}
          </DefaultButton>
        ))}
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
