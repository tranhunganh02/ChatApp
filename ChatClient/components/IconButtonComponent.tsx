import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  onPress?: () => void;
  colorButton?: string;
  stylesButton?: StyleProp<ViewStyle>;
}

export default function IconButtonComponent(props: Props) {
  const { icon, onPress, colorButton, stylesButton } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: colorButton ?? "transparent",
          borderRadius: 50,
        },
        stylesButton,
      ]}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
