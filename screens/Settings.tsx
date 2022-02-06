import { ScrollView, StyleSheet, View, Switch } from "react-native";
import React, { useState } from "react";
import { Card, DefaultText, GradientBackground, IconButton } from "@components";
import Slider from "@react-native-community/slider";
import { appColors } from "@constants/Colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorParams } from "@config/GameNavigator";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { saveSettings } from "@store/settingsThunks";

type SettingsProps = {
  navigation: NativeStackNavigationProp<StackNavigatorParams, "Settings">;
};

const Settings = ({ navigation }: SettingsProps) => {
  const savedGameSpeed = useAppSelector((state) => state.game.initialSpeed);
  const savedSettings = useAppSelector((state) => state.settings);
  const [speed, setSpeed] = useState(savedGameSpeed || 1);
  const [sounds, setSounds] = useState(savedSettings.sounds);
  const [haptics, setHaptics] = useState(savedSettings.haptics);
  const dispatch = useAppDispatch();

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.settingsContainer}>
        <Card style={styles.settings}>
          <View style={styles.setting}>
            <DefaultText style={styles.label}>LEVEL {speed}</DefaultText>
            <View>
              <Slider
                value={speed}
                onValueChange={(value) => {
                  setSpeed(value);
                }}
                step={1}
                minimumValue={1}
                maximumValue={10}
                style={styles.slider}
                minimumTrackTintColor={appColors.primary}
                thumbTintColor={appColors.white}
              />
            </View>
          </View>
          <View
            style={{
              paddingVertical: 10,
              width: "100%",
            }}
          >
            <DefaultText
              style={{ fontSize: 18, color: "#ccc", paddingVertical: 4 }}
            >
              Please note, changing the game speed will reset the game.
            </DefaultText>
          </View>
          <View style={styles.setting}>
            <DefaultText style={styles.label}>SOUNDS</DefaultText>
            <View>
              <Switch
                value={sounds}
                onValueChange={() => {
                  setSounds((state) => !state);
                }}
                trackColor={{ true: appColors.primary }}
                thumbColor={appColors.white}
              />
            </View>
          </View>
          <View style={styles.setting}>
            <DefaultText style={styles.label}>HAPTICS</DefaultText>
            <View>
              <Switch
                value={haptics}
                onValueChange={() => {
                  setHaptics((state) => !state);
                }}
                trackColor={{ true: appColors.primary }}
                thumbColor={appColors.white}
              />
            </View>
          </View>
          <IconButton
            style={styles.button}
            pressHandler={() => {
              dispatch(saveSettings({ speed, sounds, haptics }));
              navigation.goBack();
            }}
            icon={require("../assets/images/submit.png")}
          />
        </Card>
      </ScrollView>
    </GradientBackground>
  );
};

export default Settings;

const styles = StyleSheet.create({
  settingsContainer: {
    padding: 30,
  },
  settings: {
    padding: 30,
    backgroundColor: appColors.black,
    alignItems: "center",
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 15,
  },
  label: {
    color: appColors.white,
    fontSize: 24,
  },
  slider: {
    width: 150,
    height: 20,
  },
  button: {
    marginTop: 10,
  },
});
