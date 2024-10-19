import { View, Text, Touchable, StyleProp, ViewStyle, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { appColors } from '../constants/appColor'
interface Props {
    child: ReactNode,
    color?: string,
    onPress?: () => void,
    size?: number,
    styles?: StyleProp<ViewStyle>,
    disabled?: boolean,

}

const CircleComponent = (props: Props) => {

  const {child, color, onPress, size, disabled=false, styles} = props

  return (
    <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    style={[{
        height: size?? 40,
        width: size?? 40,
        backgroundColor: color?? appColors.primary,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: appColors.gray,
        shadowOffset: { width: 0, height: 2 },
    }, styles]}
    >
     {child}
    </TouchableOpacity>
  )
}

export default CircleComponent