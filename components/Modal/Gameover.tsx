import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import DefaultText from "../UI/DefaultText";
import Input from "../UI/Input";
import DefaultButton from "../UI/DefaultButton";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { submitScore } from "@store/scores";

const Gameover = () => {
  const score = useAppSelector((state) => state.game.initialScore);
  const [name, setName] = useState("");
  const [nameIsValid, setNameIsValid] = useState(false);
  const [scoreIsSubmitted, setScoreIsSubmitted] = useState(false);
  const dispatch = useAppDispatch();

  const nameChangeHandler = useCallback((_, text: string, isValid: boolean) => {
    setName(text);
    setNameIsValid(isValid);
  }, []);

  return (
    <>
      <DefaultText style={styles.title}>GAME OVER</DefaultText>
      <DefaultText style={styles.text}>
        Your score: <Text style={styles.score}> {score}</Text>
      </DefaultText>
      {!scoreIsSubmitted ? (
        <View style={styles.form}>
          <Input
            id={"name"}
            label={"ENTER YOUR NAME:"}
            value={name}
            onInputChange={nameChangeHandler}
            error={!nameIsValid}
            errorText={"Enter at least 3 characters."}
            autoCapitalize="none"
            min={3}
            maxLength={6}
          />
          <DefaultButton
            onPress={() => {
              dispatch(submitScore({ username: name, score: score! }))
                .unwrap()
                .then(() => {
                  setScoreIsSubmitted(true);
                });
            }}
            disabled={!nameIsValid}
          >
            SAVE SCORE
          </DefaultButton>
        </View>
      ) : (
        <DefaultText style={styles.text}>Score saved !</DefaultText>
      )}
    </>
  );
};

export default Gameover;

const styles = StyleSheet.create({
  title: {
    color: "#eee",
    fontSize: 30,
  },
  text: {
    color: "#ccc",
    fontSize: 20,
  },
  score: {
    color: "#eee",
    fontSize: 24,
  },
  form: {
    justifyContent: "center",
    alignItems: "center",
  },
});
