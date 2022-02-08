import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { StackNavigatorParams } from "@config/GameNavigator";
import { GameOver, IconButton, Pause } from "@components";
import { Card } from "@components";

const width = Dimensions.get("window").width;

type GameModalScreenProps = {
  navigation: NativeStackNavigationProp<StackNavigatorParams, "GameModal">;
  route: RouteProp<StackNavigatorParams, "GameModal">;
};

const GameModalScreen = ({ navigation, route }: GameModalScreenProps) => {
  return (
    <BlurView style={styles.screen} intensity={20}>
      <Pressable
        style={styles.backdrop}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Card style={styles.modalContainer}>
          <Pressable style={styles.modal}>
            {route.params.gameOver ? <GameOver /> : <Pause />}
            <View style={styles.actions}>
              <IconButton
                icon={require("@assets/images/escape.png")}
                pressHandler={() => {
                  navigation.navigate("Root");
                }}
              />
              <IconButton
                icon={
                  route.params.gameOver
                    ? require("@assets/images/replay.png")
                    : require("@assets/images/play.png")
                }
                pressHandler={() => {
                  navigation.goBack();
                }}
              />
            </View>
          </Pressable>
        </Card>
      </Pressable>
    </BlurView>
  );
};

export default GameModalScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.75,
    height: width * 0.75,
    backgroundColor: "#121212EE",
    padding: 20,
    borderRadius: 30,
  },
  modal: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actions: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-evenly",
  },
});
