import { View, Text, TouchableOpacity, TextInput, StyleSheet, TextInputProps, KeyboardType, StyleProp, ViewStyle } from 'react-native'
import React, { ReactNode, useState } from 'react'
import { appColors } from '../constants/appColor';
import { Ionicons } from '@expo/vector-icons';

interface InputProps {
  value: string,
  onChange: (val: string) => void,
  affix?: ReactNode,
  placeholder?: string,
  suffix?: ReactNode,
  isPassword?: boolean,
  type?: KeyboardType,
  allowClear?: boolean,
  onEnd?: () => void,
  customStyle?: StyleProp<ViewStyle>,
  colorText?: string
}

const InputComponent = (props: InputProps) => {

  const {colorText, value, onChange, affix, placeholder, suffix, isPassword, type, allowClear, onEnd, customStyle } = props;

  const [isShowPass, setShowPass] = useState(isPassword ?? false);

  return (
    <View style={[customStyle ?? styles.inputContainer]}>
      {affix ?? affix}
        <TextInput 
        textAlign='left'
          placeholderTextColor={appColors.gray}
          style={[styles.input, {color: colorText}]}
          placeholder={placeholder ?? ''}
          onChangeText={val => onChange(val)}
          value={value}
          secureTextEntry={isShowPass}
          keyboardType={type?? 'default'}
          onEndEditing={onEnd}
          multiline={true} // Cho phép nhập nhiều dòng
        numberOfLines={1}
        />
      {suffix ?? suffix}
      <TouchableOpacity
        onPress={
          isPassword? () => setShowPass(!isShowPass) : () => onChange('')
        }
      >
        {
          isPassword? 
            isShowPass?
              (
                <Ionicons name='eye' size={22} color={appColors.gray} />
              ):
              (
                <Ionicons name='eye-off'  size={22} color={appColors.gray} >Hide</Ionicons>
              ): 
            value.length > 0&& allowClear&&( 
              <Text>Clear</Text>
            )
        }
      </TouchableOpacity>
    </View>
  )
}

export default InputComponent

const styles = StyleSheet.create({ 
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.gray2,
    width:'100%',
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 56,
    backgroundColor: appColors.white,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal:14,
    color: appColors.black,
     textAlignVertical: 'top'
  }
})