import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

type GameInfoProps = {
  title: string;
  info: number;
};

const GameInfo = ({ title, info }: GameInfoProps) => {
  return (
    <View style={styles.gameInfo}>
      <View
        style={{
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <View style={styles.iconContainer}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../../assets/images/trophy.png")}
          />
        </View>
        <Text style={styles.text}>{title}</Text>
      </View>
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
    marginTop: "auto",
    marginBottom: 5,
  },
  iconContainer: {
    height: 20,
    width: 20,
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontFamily: "dogbyte",
    fontWeight: "bold",
    fontSize: 25,
    color: "#bbb",
    marginTop: 5,
  },
});
