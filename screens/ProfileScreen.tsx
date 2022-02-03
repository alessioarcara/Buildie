import { DefaultButton, DefaultText, GradientBackground } from "@components";
import defaultStyles from "@constants/defaultStyles";
import { invalidate } from "@store/authThunk";
import { useAppDispatch } from "@store/hooks";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useHelloWorldQuery } from "../services/gameApi";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { data } = useHelloWorldQuery();
  return (
    <GradientBackground>
      <View style={defaultStyles.centered}>
        <DefaultButton onPress={() => dispatch(invalidate())}>
          Ciao
        </DefaultButton>
        <DefaultText>{data}</DefaultText>
      </View>
    </GradientBackground>
  );
};

export default Profile;

const styles = StyleSheet.create({});
