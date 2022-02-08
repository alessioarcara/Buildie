import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import React from "react";
import DefaultText from "../UI/DefaultText";

type GameStatisticProps = {
  title: string;
  statistic: number;
  icon: ImageSourcePropType;
};

const GameStatistic = ({ title, statistic, icon }: GameStatisticProps) => {
  return (
    <View style={styles.gameStatisticContainer}>
      <View style={styles.gameStatistic}>
        <View style={styles.iconContainer}>
          <Image style={styles.icon} resizeMode="cover" source={icon} />
        </View>
      </View>
      <DefaultText style={styles.title}>{title}</DefaultText>
      <DefaultText style={styles.text}>{statistic}</DefaultText>
    </View>
  );
};

export default React.memo(GameStatistic);

const styles = StyleSheet.create({
  gameStatisticContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 5,
  },
  gameStatistic: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  iconContainer: {
    height: 30,
    width: 30,
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 25,
    color: "#ccc",
  },
  text: {
    fontSize: 25,
    color: "#eee",
    marginTop: 5,
  },
});
