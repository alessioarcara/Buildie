import { Dimensions, Pressable, StyleSheet } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorParams } from "@config/GameNavigator";
import { DefaultText } from "@components";
import { Card } from "@components";

type GameoverScreenProps = {
  navigation: NativeStackNavigationProp<StackNavigatorParams, "Gameover">;
};

const GameoverScreen = ({ navigation }: GameoverScreenProps) => {
  return (
    <BlurView style={{ flex: 1 }} intensity={20}>
      <Pressable
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => navigation.goBack()}
      >
        <Card style={styles.gameOver}>
          <DefaultText style={styles.title}>PAUSE</DefaultText>
        </Card>
      </Pressable>
    </BlurView>
  );
};

export default GameoverScreen;

const styles = StyleSheet.create({
  gameOver: {
    width: "70%",
    height: "30%",
    backgroundColor: "#121212EE",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  title: {
    color: "#bbb",
    fontSize: 24,
  },
});
