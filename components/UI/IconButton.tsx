import {
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  Image,
  ViewStyle,
} from "react-native";
import React from "react";

type IconButtonProps = {
  pressHandler: () => void;
  icon: ImageSourcePropType;
  style?: ViewStyle;
};

const IconButton = ({ pressHandler, icon, style }: IconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={pressHandler}
      style={{ ...styles.button, ...style }}
    >
      <Image style={styles.icon} resizeMode="cover" source={icon} />
    </TouchableOpacity>
  );
};

export default React.memo(IconButton);

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  icon: {
    width: "100%",
    height: "100%",
  },
});
