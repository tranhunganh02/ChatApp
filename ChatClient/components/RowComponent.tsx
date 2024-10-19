import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { ReactNode } from "react";
import { globalStyles } from "@/styles/globalStyles";

interface Props {
  justify?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | undefined;
  styles?: StyleProp<ViewStyle>;
  children: ReactNode;
  onPress?: () => void;
}

export default function RowComponent(props: Props) {
  const { styles, justify, children, onPress } = props;

  const localStyle = [
    globalStyles.rowStart,
    {
      justifyContent: justify ?? "center",
    },
    styles,
  ];

  return onPress ? (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={localStyle}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={localStyle}>{children}</View>
  );
}

const styles = StyleSheet.create({});
