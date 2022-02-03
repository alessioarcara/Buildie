import { DefaultButton, DefaultText, GradientBackground } from "@components";
import defaultStyles from "@constants/defaultStyles";
import { invalidate } from "@store/authThunk";
import { useAppDispatch } from "@store/hooks";
import React from "react";
import { StyleSheet, View } from "react-native";

const Profile = () => {
  const dispatch = useAppDispatch();
  return (
    <GradientBackground>
      <View style={defaultStyles.centered}>
        <DefaultButton onPress={() => dispatch(invalidate())}>
          Logout
        </DefaultButton>
      </View>
    </GradientBackground>
  );
};

export default Profile;

const styles = StyleSheet.create({});
