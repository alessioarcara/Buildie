import { StyleSheet, Text, View } from "react-native";
import React from "react";

type GameInfoProps = {
  title: string;
  info: number;
};

const GameInfo = ({ title, info }: GameInfoProps) => {
  return (
    <View style={styles.gameInfo}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.text}>{info}</Text>
    </View>
  );
};

export default React.memo(GameInfo);

const styles = StyleSheet.create({
  gameInfo: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
