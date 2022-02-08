import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import JoystickButton from "./JoystickButton";
import Commands from "@constants/Commands";

type JoystickProps = {
  handleInput: (key: string) => void;
};

const Joystick = ({ handleInput }: JoystickProps) => {
  return (
    <View style={styles.joystick}>
      <View style={styles.joystickArrows}>
        <JoystickButton
          icon="arrow-up"
          pressHandler={() => handleInput(Commands.HardDrop)}
          feedback="medium"
        />
        <View style={styles.joystickArrowsContainer}>
          <JoystickButton
            icon="arrow-left"
            pressHandler={() => handleInput(Commands.MoveLeft)}
          />
          <JoystickButton
            icon="arrow-down"
            pressHandler={() => handleInput(Commands.MoveDown)}
          />
          <JoystickButton
            icon="arrow-right"
            pressHandler={() => handleInput(Commands.MoveRight)}
          />
        </View>
      </View>
      <View style={styles.joystickButtons}>
        <JoystickButton
          icon="exchange"
          pressHandler={() => handleInput(Commands.HoldPiece)}
        />
        <JoystickButton
          icon="rotate-right"
          pressHandler={() => handleInput(Commands.RotateRight)}
        />
      </View>
    </View>
  );
};

export default React.memo(Joystick);

const styles = StyleSheet.create({
  joystick: {
    height: Dimensions.get("window").height * 0.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  joystickArrows: {
    flex: 2,
  },
  joystickArrowsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  joystickButtons: {
    flex: 1,
  },
});
