import { StyleSheet, View } from "react-native";
import React from "react";
import { Card, GradientBackground } from "@components";

const MultiplayerScreen = () => {
  return (
    <GradientBackground>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Card>
          <Input />
        </Card>
      </View>
    </GradientBackground>
  );
};

export default MultiplayerScreen;

const styles = StyleSheet.create({});
