import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import Cell from "./Cell";

type HoldProps = {
  label: string;
  heldPiece?: string;
};

const Hold = ({ label, heldPiece }: HoldProps) => {
  const currHeldPiece = useMemo(
    () =>
      heldPiece &&
      [...heldPiece].map((type, idx) => (
        <Cell key={`h_${idx}`} type={+type} width={60 / 4} />
      )),
    [heldPiece]
  );

  return (
    <View>
      <Text>{label}</Text>
      <View
        style={{
          backgroundColor: "#000",
          width: 60,
          height: 60,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {currHeldPiece}
      </View>
    </View>
  );
};

export default Hold;

const styles = StyleSheet.create({});
