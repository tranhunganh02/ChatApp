import { View, Text, TouchableOpacity, TextInput, StyleSheet, TextInputProps, KeyboardType } from 'react-native'
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
  onEnd?: () => void
}

const InputComponent = (props: InputProps) => {

  const {value, onChange, affix, placeholder, suffix, isPassword, type, allowClear, onEnd } = props;

  const [isShowPass, setShowPass] = useState(isPassword ?? false);

  return (
    <View style={[styles.inputContainer]}>
      {affix ?? affix}
        <TextInput 
          style={styles.input}
          placeholder={placeholder ?? ''}
          onChangeText={val => onChange(val)}
          value={value}
          secureTextEntry={isShowPass}
          keyboardType={type?? 'default'}
          onEndEditing={onEnd}
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
    color: appColors.black
  }
})