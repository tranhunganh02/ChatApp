import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'

interface Props {
    icon: ReactNode;
    onPress?: () => void;
    colorButton?: string;
    stylesButton?: StyleProp<ViewStyle>;
}

const IconButtonComponent = (props: Props) => {
    const {icon, onPress, colorButton, stylesButton} = props
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[{
                backgroundColor: colorButton?? 'transparent',
                borderRadius: 50,
                padding: 8
            }, stylesButton]}
        >
            {icon}
        </TouchableOpacity>
    )
}

export default IconButtonComponent