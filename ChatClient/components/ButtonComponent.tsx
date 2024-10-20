import {
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
    Dimensions,
  } from "react-native";
  import React, { ReactNode } from "react";
  import { appColors } from "@/constants/appColor";
  import { globalStyles } from "@/styles/globalStyles";
  import TextComponent from "./TextComponent";
  import { LinearGradient } from "expo-linear-gradient";
  import { appInfo } from "@/constants/appInfors";
  
  interface Props {
    icon?: ReactNode;
    text: string;
    type?: "primary" | "text" | "link";
    color?: string;
    styles?: StyleProp<ViewStyle>;
    textColor?: string;
    textStyles?: StyleProp<TextStyle>;
    onPress?: () => void;
    iconFlex?: "right" | "left";
    textFont?: string;
    disabled?: boolean;
    useGradient?: boolean;
    gradientColors?: string[];
  }
  
  export default function ButtonComponent(props: Props) {
    const {
      icon,
      text,
      textColor,
      textStyles,
      color,
      styles,
      onPress,
      iconFlex,
      type,
      textFont,
      disabled,
      useGradient,
      gradientColors,
    } = props;
  
    const buttonStyles = [
      globalStyles.button,
      globalStyles.shadow,
      {
        backgroundColor: color
          ? color
          : disabled
          ? appColors.gray3
          : appColors.primary,
        width: appInfo.sizes.WIDTH * 0.85,
      },
      styles,
    ];
  
    return type === "primary" ? (
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        {useGradient ? (
          <LinearGradient
            colors={gradientColors || [appColors.primary, appColors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              buttonStyles,
              { justifyContent: "center", alignItems: "center" },
            ]}
          >
            {icon && iconFlex === "left" && icon}
            <TextComponent
              text={text}
              color={textColor ?? appColors.white}
              styles={[
                textStyles,
                {
                  marginLeft: icon ? 12 : 0,
                  fontSize: 16,
                  textAlign: "center",
                },
              ]}
              flex={icon && iconFlex === "right" ? 1 : 0}
              // font={textFont ?? fontFamilies.medium}
            />
            {icon && iconFlex === "right" && icon}
          </LinearGradient>
        ) : (
          <View style={buttonStyles}>
            {icon && iconFlex === "left" && icon}
            <TextComponent
              text={text}
              color={textColor ?? appColors.white}
              styles={[
                textStyles,
                {
                  marginLeft: icon ? 12 : 0,
                  fontSize: 16,
                  textAlign: "center",
                },
              ]}
              flex={icon && iconFlex === "right" ? 1 : 0}
              // font={textFont ?? fontFamilies.medium}
            />
            {icon && iconFlex === "right" && icon}
          </View>
        )}
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={onPress}>
        <TextComponent
          text={text}
          color={type === "link" ? appColors.primary : appColors.text}
        />
      </TouchableOpacity>
    );
  }
  
  const styles = StyleSheet.create({});