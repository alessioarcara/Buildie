import { StyleSheet, View } from "react-native";
import React from "react";
import DefaultText from "../UI/DefaultText";

type ScoreProps = {
  rank: number;
  score: number;
  name: string;
  me: boolean;
};

const ScoreItem = ({ rank, score, name, me }: ScoreProps) => {
  return (
    <View style={styles.score}>
      <View style={styles.field}>
        <DefaultText style={{ ...styles.text, color: me ? "yellow" : "white" }}>
          {rank}.
        </DefaultText>
      </View>
      <View style={styles.field}>
        <DefaultText style={{ ...styles.text, color: me ? "yellow" : "white" }}>
          {score}
        </DefaultText>
      </View>
      <View style={styles.field}>
        <DefaultText style={{ ...styles.text, color: me ? "yellow" : "white" }}>
          {name.slice(0, 6)}
        </DefaultText>
      </View>
    </View>
  );
};

export default React.memo(ScoreItem);

const styles = StyleSheet.create({
  score: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  field: {
    flex: 1,
    flexShrink: 0,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
});
