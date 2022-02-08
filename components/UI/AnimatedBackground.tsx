import { Animated, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import GradientBackground from "./GradientBackground";
import shapesJson from "@constants/Shapes.json";
import Piece, { pieceWidth } from "../Game/Piece";

type AnimatedBackgroundProps = {
  children: React.ReactNode;
};

const animationHeight = Dimensions.get("window").height - pieceWidth;
const animationWidth = Dimensions.get("window").width - pieceWidth;

const AnimatedBackground = ({ children }: AnimatedBackgroundProps) => {
  const shapes = useRef(Object.values(shapesJson)).current;
  const [rndWidth, setRndWidth] = useState(
    Math.floor(Math.random() * animationWidth)
  );
  const translation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = () => {
      Animated.timing(translation, {
        toValue: animationHeight,
        duration: 4000,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setRndWidth(Math.floor(Math.random() * animationWidth));
          translation.setValue(0);
          animation();
        }
      });
    };

    animation();
  }, []);

  return (
    <GradientBackground>
      <Animated.View
        style={{
          left: rndWidth,
          transform: [{ translateY: translation }],
        }}
      >
        <Piece
          piece={shapes[Math.floor(Math.random() * shapes.length)]}
          transparentBackground
        />
      </Animated.View>
      {children}
    </GradientBackground>
  );
};

export default AnimatedBackground;

const styles = StyleSheet.create({
  animatedPiece: {
    position: "absolute",
    top: 0,
  },
});
