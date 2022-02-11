import { DefaultButton, GradientBackground } from "@components";
import { appColors } from "@constants/Colors";
import defaultStyles from "@constants/defaultStyles";
import { useAppDispatch } from "@store/hooks";
import React from "react";
import { StyleSheet, View } from "react-native";
import { invalidate } from "../services/gameApi";

const Profile = () => {
  const dispatch = useAppDispatch();
  return (
    <GradientBackground>
      <View style={defaultStyles.centered}>
        <DefaultButton
          style={styles.logoutButton}
          onPress={() => dispatch(invalidate())}
        >
          Logout
        </DefaultButton>
      </View>
    </GradientBackground>
  );
};

export default Profile;

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: appColors.error,
  },
});
