import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface Props {
  width?: number;
  height?: number;
}

export default function SpaceComponent(props: Props) {
  const { width, height } = props;

  return (
    <View
      style={{
        width,
        height,
      }}
    />
  );
}

const styles = StyleSheet.create({});
