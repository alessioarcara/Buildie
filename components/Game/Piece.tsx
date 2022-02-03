import { Dimensions, StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import Cell from "./Cell";
import DefaultText from "../UI/DefaultText";

type PieceProps = {
  title: string;
  piece?: string;
};

const pieceWidth = Dimensions.get("window").width * 0.15;

const Piece = ({ title, piece }: PieceProps) => {
  const currHeldPiece =
    piece &&
    [...piece].map((type, idx) => (
      <Cell key={`h_${idx}`} type={+type} width={pieceWidth / 4} />
    ));

  return (
    <>
      <DefaultText style={styles.title}>{title}</DefaultText>
      <View style={styles.pieceContainer}>
        <View style={styles.piece}>{currHeldPiece}</View>
      </View>
    </>
  );
};

export default React.memo(Piece);

const styles = StyleSheet.create({
  pieceContainer: {
    borderColor: "grey",
    borderWidth: 2,
    marginBottom: 10,
  },
  title: {
    color: "#bbb",
    fontSize: 18,
    textAlign: "center",
  },
  piece: {
    backgroundColor: "#000",
    width: pieceWidth,
    height: pieceWidth,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
