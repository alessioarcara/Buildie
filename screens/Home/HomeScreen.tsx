import { GradientBackground, MenuButton } from "@components";
import { StackNavigatorParams } from "@config/AppNavigator";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";
import styles from "./HomeScreen.styles";

const menuOptions = ["Giocatore Singolo", "Multigiocatore", "Impostazioni"];

type HomeProps = {
  navigation: NativeStackNavigationProp<StackNavigatorParams, "Root">;
};

const Home = ({ navigation }: HomeProps) => {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <GradientBackground>
      <View style={{ marginBottom: tabBarHeight, ...styles.list }}>
        <Text style={{ fontSize: 100, color: "white" }}>LOGO</Text>
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
