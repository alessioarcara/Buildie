import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  TouchableOpacityProps,
} from "react-native";
// import colors from "../../constants/colors";

type MainButtonProps = {
  children: React.ReactNode;
  style?: ViewStyle;
} & TouchableOpacityProps;

const MenuButton = ({ children, style, ...props }: MainButtonProps) => {
  return (
    <TouchableOpacity activeOpacity={0.6} {...props}>
      <View style={[styles.button, style]}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MenuButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#192f6a",
    paddingVertical: 12,
    paddingHorizontal: 30,
    minWidth: 250,
    borderRadius: 25,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
  },
  buttonText: {
    color: "white",
    // fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
  },
});

/* background-image: linear-gradient(90deg, 
    rgb(24, 29, 39) 0%, 
rgb(37, 44, 60) 14.06%, 
rgb(37, 45, 61) 83.85%, 
rgb(20, 24, 32) 100%); */

// <!-- HTML !-->
// <button class="button-30" role="button">Button 30</button>

// /* CSS */
// .button-30 {
//   align-items: center;
//   appearance: none;
//   background-color: #FCFCFD;
//   border-radius: 4px;
//   border-width: 0;
//   box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
//   box-sizing: border-box;
//   color: #36395A;
//   cursor: pointer;
//   display: inline-flex;
//   font-family: "JetBrains Mono",monospace;
//   height: 48px;
//   justify-content: center;
//   line-height: 1;
//   list-style: none;
//   overflow: hidden;
//   padding-left: 16px;
//   padding-right: 16px;
//   position: relative;
//   text-align: left;
//   text-decoration: none;
//   transition: box-shadow .15s,transform .15s;
//   user-select: none;
//   -webkit-user-select: none;
//   touch-action: manipulation;
//   white-space: nowrap;
//   will-change: box-shadow,transform;
//   font-size: 18px;
// }

// .button-30:focus {
//   box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
// }

// .button-30:hover {
//   box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
//   transform: translateY(-2px);
// }

// .button-30:active {
//   box-shadow: #D6D6E7 0 3px 7px inset;
//   transform: translateY(2px);
// }
