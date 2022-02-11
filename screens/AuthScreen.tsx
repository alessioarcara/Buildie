import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
  View,
} from "react-native";
import React, { useState } from "react";
import { Card, DefaultButton, GradientBackground, Input } from "@components";
import { useSigninMutation, useSignupMutation } from "../services/gameApi";
import useForm from "../hooks/useForm";
import { useAppDispatch } from "@store/hooks";
import { authenticate } from "@store/authThunks";
import defaultStyles from "@constants/defaultStyles";
import usePushNotification from "@hooks/usePushNotification";
import { handleErrorResponse } from "../helpers/utils";

const AuthScreen = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [{ inputValues, inputValidities, formIsValid }, inputChangeHandler] =
    useForm({ username: "", email: "", password: "" });
  const dispatch = useAppDispatch();
  const getPushToken = usePushNotification();

  const [signin, { isLoading }] = useSigninMutation({
    fixedCacheKey: "shared-auth",
  });
  const [signup] = useSignupMutation({ fixedCacheKey: "shared-auth" });

  const authHandler = async () => {
    const expoToken = await getPushToken();
    const { username, ...user } = inputValues;
    try {
      const authResponse = await (isNewUser
        ? signup({ ...inputValues, expoToken })
        : signin({ ...user, expoToken })
      ).unwrap();
      authResponse.data
        ? dispatch(authenticate(authResponse.data))
        : handleErrorResponse(authResponse.problem);
    } catch (err) {
      handleErrorResponse();
    }
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        style={defaultStyles.centered}
      >
        <Card style={styles.formContainer}>
          <ScrollView>
            {isNewUser && (
              <Input
                id="username"
                label="USERNAME"
                value={inputValues.username}
                onInputChange={inputChangeHandler}
                required
                minLength={6}
                autoCapitalize="none"
                error={!inputValidities.username}
                errorText="Please enter a valid username."
              />
            )}
            <Input
              id="email"
              label="EMAIL"
              value={inputValues.email}
              onInputChange={inputChangeHandler}
              required
              email
              minLength={10}
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
              minLength={6}
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
                disabled={
                  isNewUser
                    ? !formIsValid
                    : !inputValidities.email || !inputValidities.password
                }
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
