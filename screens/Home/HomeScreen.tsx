import { GradientBackground, MenuButton } from "@components";
import { StackNavigatorParams } from "@config/AppNavigator";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";
import styles from "./HomeScreen.styles";
import { squareColors } from "@constants/Colors";

const menuOptions = ["Giocatore Singolo", "Multigiocatore", "Impostazioni"];

type HomeProps = {
  navigation: NativeStackNavigationProp<StackNavigatorParams, "Root">;
};

const logo = "Buildie";

const Home = ({ navigation }: HomeProps) => {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <GradientBackground>
      <View style={{ marginBottom: tabBarHeight, ...styles.list }}>
        <Text style={styles.logo}>
          {[...logo].map((char, idx) => (
            <Text
              style={{ color: squareColors[idx + 1] }}
              key={`${char}_${idx}`}
            >
              {char}
            </Text>
          ))}
        </Text>
        {menuOptions.map((menuOption) => (
          <MenuButton
            key={menuOption}
            // style={styles.listItem}
            onPress={() => {
              navigation.navigate("Singleplayer", { gameId: "asd123" });
            }}
          >
            {menuOption}
          </MenuButton>
        ))}
      </View>
    </GradientBackground>
  );
};

export default Home;
