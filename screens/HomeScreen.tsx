import React from "react";
import { DefaultText, GradientBackground, DefaultButton } from "@components";
import { StackNavigatorParams } from "@config/GameNavigator";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, StyleSheet } from "react-native";
import { squareColors } from "@constants/Colors";
import { useAppSelector } from "@store/hooks";

const menuOptions = ["Singleplayer", "Resume", "Multiplayer", "Settings"];

type HomeProps = {
  navigation: NativeStackNavigationProp<StackNavigatorParams, "Root">;
};

const logo = "Buildie";

const Home = ({ navigation }: HomeProps) => {
  const tabBarHeight = useBottomTabBarHeight();
  const isSignedIn = useAppSelector((state) => !!state.auth.accessToken);

  return (
    <GradientBackground>
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
        {menuOptions.reduce<JSX.Element[]>((acc, menuOption) => {
          return menuOption !== "Resume"
            ? [
                ...acc,
                <DefaultButton
                  key={menuOption}
                  style={styles.homeButton}
                  disabled={menuOption === "Multiplayer" && !isSignedIn}
                  onPress={() => {
                    navigation.navigate("Singleplayer", { gameId: "asd123" });
                  }}
                >
                  {menuOption}
                </DefaultButton>,
              ]
            : acc;
        }, [])}
      </View>
    </GradientBackground>
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
    backgroundColor: "#192f6a",
    minWidth: 250,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
  },
});

export default Home;
