import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import Cell from "./Cell";
import DefaultText from "../UI/DefaultText";

type PieceProps = {
  title?: string;
  piece?: string;
  transparentBackground?: boolean;
};

export const pieceWidth = Dimensions.get("window").width * 0.15;

const Piece = ({ title, piece, transparentBackground }: PieceProps) => {
  const currHeldPiece =
    piece &&
    [...piece].map((type, idx) => (
      <Cell
        key={`h_${idx}`}
        type={+type === 0 && transparentBackground ? -1 : +type}
        width={pieceWidth / 4}
        border={!transparentBackground}
      />
    ));

  return (
    <>
      <DefaultText style={styles.title}>{title}</DefaultText>
      <View
        style={{
          ...styles.pieceContainer,
          ...{
            borderColor: transparentBackground ? "" : "grey",
            borderWidth: transparentBackground ? 0 : 2,
          },
        }}
      >
        <View
          style={{
            ...styles.piece,
            ...{
              backgroundColor: transparentBackground ? "" : "#000",
            },
          }}
        >
          {currHeldPiece}
        </View>
      </View>
    </>
  );
};

export default React.memo(Piece);

const styles = StyleSheet.create({
  pieceContainer: {
    marginBottom: 10,
  },
  title: {
    color: "#bbb",
    fontSize: 18,
    textAlign: "center",
  },
  piece: {
    width: pieceWidth,
    height: pieceWidth,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
