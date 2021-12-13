import { GradientBackground, MenuButton } from "@components";
import { StackNavigatorParams } from "@config/Navigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";
import styles from "./Home.styles";

type HomeProps = {
  navigation: NativeStackNavigationProp<StackNavigatorParams, "Home">;
};

const Home = ({ navigation }: HomeProps) => {
  return (
    <GradientBackground>
      <View style={styles.list}>
        <Text style={{ fontSize: 100, color: "white" }}>LOGO</Text>
        {["Giocatore Singolo", "Multigiocatore", "Impostazioni"].map(
          (menuOption) => (
            <MenuButton
              // style={styles.listItem}
              onPress={() => {
                navigation.navigate("SinglePlayer", { gameId: "asd123" });
              }}
            >
              {menuOption}
            </MenuButton>
          )
        )}
      </View>
    </GradientBackground>
  );
};

export default Home;
