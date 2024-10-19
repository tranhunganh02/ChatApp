import { View, Text, StyleProp, TextStyle } from 'react-native'
import React from 'react'
import { appColors } from '../constants/appColor';
import { globalStyles } from '../styles/globalStyles';
import { fontFamilies } from '../constants/fontFamilies';

interface Props {
    text: string;
    color?: string;
    size?: number;
    flex?: number;
    font?: string;
    styles?: StyleProp<TextStyle>;
    title?: boolean;
  }
  
  const TextComponent = (props: Props) => {
    const {text, size, flex, font, color, styles, title} = props;
  
    return (
      <Text
        style={[
          globalStyles.text,
          {
            color: color ?? appColors.text,
            flex: flex ?? 0,
            fontSize: size ?? title ? size : 12,
            fontFamily: font ?? title ? fontFamilies.bold : fontFamilies.regular,
          },
          styles,
        ]}>
        {text}
      </Text>
    );
  };
  
export default TextComponent