import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
  View,
} from "react-native";
import React, { useState } from "react";
import { Card, DefaultButton, GradientBackground, Input } from "@components";
import { useSigninMutation, useSignupMutation } from "../services/gameApi";
import useForm from "../hooks/useForm";
import { useAppDispatch } from "@store/hooks";
import { authenticate } from "@store/authThunk";
import defaultStyles from "@constants/defaultStyles";

const AuthScreen = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [{ inputValues, inputValidities, formIsValid }, inputChangeHandler] =
    useForm({ email: "", password: "" });
  const dispatch = useAppDispatch();

  const [signin, { isLoading }] = useSigninMutation({
    fixedCacheKey: "shared-auth",
  });
  const [signup] = useSignupMutation({ fixedCacheKey: "shared-auth" });

  const authHandler = () => {
    const user = { email: inputValues.email, password: inputValues.password };
    (isNewUser ? signup(user) : signin(user)).unwrap().then((authResponse) => {
      authResponse.data
        ? dispatch(authenticate(authResponse.data))
        : Alert.alert("There's a problem!", authResponse.problem),
        [{ text: "Okay" }];
    });
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        style={defaultStyles.centered}
      >
        <Card style={styles.formContainer}>
          <ScrollView>
            <Input
              id="email"
              label="EMAIL"
              value={inputValues.email}
              onInputChange={inputChangeHandler}
              required
              email
              keyboardType="email-address"
              autoCapitalize="none"
              error={!inputValidities.email}
              errorText="Please enter a valid email address."
            />
            <Input
              id="password"
              label="PASSWORD"
              value={inputValues.password}
              onInputChange={inputChangeHandler}
              required
              secureTextEntry
              minLength={5}
              autoCapitalize="none"
              error={!inputValidities.password}
              errorText="Please enter a valid password."
            />
            {isLoading ? (
              <View style={styles.loadingSpinner}>
                <ActivityIndicator size="large" color="orange" />
              </View>
            ) : (
              <DefaultButton
                style={styles.button}
                disabled={!formIsValid}
                onPress={authHandler}
              >
                {isNewUser ? "REGISTER" : "LOGIN"}
              </DefaultButton>
            )}
            <DefaultButton
              style={styles.button}
              onPress={() => setIsNewUser((prevState) => !prevState)}
            >
              {isNewUser ? "Switch to Login" : "Switch to Register"}
            </DefaultButton>
          </ScrollView>
        </Card>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: "#121212CC",
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  loadingSpinner: {
    marginTop: 10,
  },
  button: {
    marginTop: 10,
    alignSelf: "center",
    paddingHorizontal: 0,
  },
});
