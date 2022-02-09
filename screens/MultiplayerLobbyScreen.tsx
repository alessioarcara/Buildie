import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Card, Input, DefaultButton, DefaultText } from "@components";
import { BlurView } from "expo-blur";
import { appColors } from "@constants/Colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorParams } from "@config/GameNavigator";
import { useCreateGameMutation } from "../services/gameApi";
import { handleErrorResponse } from "../helpers/utils";

type MultiplayerScreenProps = {
  navigation: NativeStackNavigationProp<
    StackNavigatorParams,
    "MultiplayerLobby"
  >;
};

const MultiplayerScreen = ({ navigation }: MultiplayerScreenProps) => {
  const [username, setUsername] = useState("");
  const [usernameIsValid, setUsernameIsValid] = useState(false);

  const nameChangeHandler = useCallback((_, text: string, isValid: boolean) => {
    setUsername(text);
    setUsernameIsValid(isValid);
  }, []);

  const [createGame] = useCreateGameMutation();

  const handleCreateGame = useCallback(async () => {
    try {
      const gameResponse = await createGame(username).unwrap();
      gameResponse.data
        ? navigation.replace("MultiplayerGame", {
            gameId: gameResponse.data.gameId,
          })
        : handleErrorResponse(gameResponse.problem);
    } catch (err) {
      handleErrorResponse();
    }
  }, [username]);

  return (
    <BlurView style={styles.screen} intensity={20}>
      <Pressable
        style={styles.backdrop}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "position"}
        style={styles.bottomContainer}
      >
        <Card style={styles.lobby}>
          <DefaultText style={styles.text}>
            Insert an username of player to challenge
          </DefaultText>
          <View>
            <Input
              id="username"
              label="USERNAME"
              value={username}
              onInputChange={nameChangeHandler}
              required
              minLength={6}
              autoCapitalize="none"
              error={!usernameIsValid}
              errorText="Please enter a valid username."
            />
          </View>
          <DefaultButton onPress={handleCreateGame}>Challenge</DefaultButton>
        </Card>
      </KeyboardAvoidingView>
    </BlurView>
  );
};

export default MultiplayerScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  backdrop: {
    flex: 3,
  },
  bottomContainer: {
    backgroundColor: appColors.primaryLight,
    flex: 2,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  lobby: {
    backgroundColor: appColors.black,
    width: "75%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  text: {
    color: "#eee",
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 10,
  },
});
