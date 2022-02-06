import { StyleSheet, Image, View } from "react-native";
import React from "react";
import { DefaultText, GradientBackground } from "@components";

const LeaderboardScreen = () => {
  return (
    <GradientBackground>
      <View style={{ width: 50, height: 50 }}>
        <Image
          style={{ width: "100%", height: "100%" }}
          source={require("@assets/images/leaderboard.png")}
        />
      </View>
      <View>
        <DefaultText>Leaderboard</DefaultText>
      </View>
    </GradientBackground>
  );
};

export default LeaderboardScreen;

const styles = StyleSheet.create({});
