import { StyleSheet, View } from "react-native";
import React from "react";
import DefaultText from "../UI/DefaultText";
import { appColors } from "@constants/Colors";

const ScoreListHeader = () => {
  return (
    <View style={styles.listHeader}>
      <View style={styles.title}>
        <DefaultText style={styles.text}>RANK</DefaultText>
      </View>
      <View style={styles.title}>
        <DefaultText style={styles.text}>SCORE</DefaultText>
      </View>
      <View style={styles.title}>
        <DefaultText style={styles.text}>NAME</DefaultText>
      </View>
    </View>
  );
};

export default React.memo(ScoreListHeader);

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#000",
  },
  title: {
    borderBottomColor: appColors.primary,
    borderBottomWidth: 4,
    paddingVertical: 2,
  },
  text: {
    color: "white",
    fontSize: 30,
  },
});
