import { StyleSheet } from "react-native";
import React from "react";
import DefaultText from "../UI/DefaultText";

const Pause = () => {
  return (
    <>
      <DefaultText style={styles.title}>PAUSE</DefaultText>
      <DefaultText style={styles.text}>
        Anytime you quit or close the app, the game will be saved.
      </DefaultText>
    </>
  );
};

export default Pause;

const styles = StyleSheet.create({
  title: {
    color: "#eee",
    fontSize: 30,
  },
  text: {
    color: "#ccc",
    fontSize: 20,
    paddingVertical: 4,
  },
});
