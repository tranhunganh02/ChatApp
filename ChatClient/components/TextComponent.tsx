import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import React from "react";
import { globalStyles } from "@/styles/globalStyles";
import { appColors } from "@/constants/appColor";

interface Props {
  text: string;
  color?: string;
  size?: number;
  flex?: number;
  font?: string;
  styles?: StyleProp<TextStyle>;
  title?: boolean;
}

export default function TextComponent(props: Props) {
  const { text, color, size, flex, font, styles, title } = props;

  return (
    <Text
      style={[
        globalStyles.text,
        {
          color: color ?? appColors.text,
          flex: flex ?? 0,
          fontSize: size ?? title ? size : 12,
          // fontFamily: font ?? title ? fontFamilies.bold : fontFamilies.regular,
        },
        styles,
      ]}
    >
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({});
