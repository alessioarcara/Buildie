import { StyleSheet, View } from "react-native";
import React from "react";
import JoystickButton from "../UI/JoystickButton";
import Commands from "../../constants/Commands";

type JoystickProps = {
  handleInput: (key: string) => void;
};

const Joystick = ({ handleInput }: JoystickProps) => {
  return (
    <View style={styles.joystick}>
      <JoystickButton
        icon="chevron-back"
        pressHandler={() => handleInput(Commands.MoveLeft)}
      />
      <JoystickButton
        icon="chevron-down"
        pressHandler={() => handleInput(Commands.MoveDown)}
      />
      <JoystickButton
        icon="chevron-forward"
        pressHandler={() => handleInput(Commands.MoveRight)}
      />
      <JoystickButton
        icon="swap-horizontal-sharp"
        pressHandler={() => handleInput(Commands.RotateRight)}
      />
    </View>
  );
};

export default React.memo(Joystick);

const styles = StyleSheet.create({
  joystick: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
