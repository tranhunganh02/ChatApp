import {
    View,
    Text,
    StyleProp,
    ViewStyle,
    TextStyle,
    TouchableOpacity,
} from 'react-native';
import React, { ReactNode } from 'react';
import { TextComponent } from '.';
import { globalStyles } from '../styles/globalStyles';
import { fontFamilies } from '../constants/fontFamilies';
import { appColors } from '../constants/appColor';

interface Props {
    icon?: ReactNode;
    text: string;
    type?: 'primary' | 'text' | 'link';
    color?: string;
    styles?: StyleProp<ViewStyle>;
    textColor?: string;
    textStyles?: StyleProp<TextStyle>;
    onPress?: () => void;
    iconFlex?: 'right' | 'left';
    textFont?: string;
    disabled?: boolean;
}

const ButtonComponent = (props: Props) => {
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
    } = props;

    return type === 'primary' ? (
            <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[
                globalStyles.button,
                globalStyles.shadow,
                {
                    backgroundColor: color ? color : disabled ? appColors.gray3 : appColors.primary,
                    marginBottom: 12,
                    width:'85%'
                },
                styles,
            ]}>
            {icon && iconFlex === 'left' && icon}
            <TextComponent
                text={text}
                color={textColor ?? appColors.white}
                styles={[
                    textStyles,
                    {
                        marginLeft: icon ? 12 : 0,
                        fontSize: 16,
                        textAlign:'center'
                    },
                ]}
                flex={icon && iconFlex === 'right' ? 1 : 0}
                font={textFont ?? fontFamilies.medium}
            />
            {icon && iconFlex === 'right' && icon}
        </TouchableOpacity>
    ) : (
        <TouchableOpacity onPress={onPress}>
            <TextComponent
                text={text}
                color={type === 'link' ? appColors.primary : appColors.text}
            />
        </TouchableOpacity>
    );
};

export default ButtonComponent;