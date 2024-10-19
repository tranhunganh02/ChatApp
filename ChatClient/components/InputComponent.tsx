import {
  KeyboardType,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { ReactNode, useState } from "react";
import { appColors } from "@/constants/appColor";
import { EyeSlash, Eye } from "iconsax-react-native";
import SpaceComponent from "./SpaceComponent";

interface InputProps {
  value: string;
  onChange: (val: string) => void;
  affix?: ReactNode;
  placeholder?: string;
  suffix?: ReactNode;
  isPassword?: boolean;
  type?: KeyboardType;
  allowClear?: boolean;
  onEnd?: () => void;
}

export default function InputComponent(props: InputProps) {
  const {
    value,
    onChange,
    affix,
    placeholder,
    suffix,
    isPassword,
    type,
    allowClear,
    onEnd,
  } = props;

  const [isShowPass, setShowPass] = useState(isPassword ?? false);

  return (
    <View style={[styles.inputContainer]}>
      {affix ?? affix}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 5,
          borderBottomColor: "#CDD1D0",
          borderBottomWidth: 1,
          paddingVertical: 10,
        }}
      >
        <TextInput
          style={styles.input}
          placeholder={placeholder ?? ""}
          onChangeText={(val) => onChange(val)}
          value={value}
          secureTextEntry={isShowPass}
          keyboardType={type ?? "default"}
          onEndEditing={onEnd}
        />
        <TouchableOpacity
          onPress={
            isPassword ? () => setShowPass(!isShowPass) : () => onChange("")
          }
        >
          {isPassword ? (
            isShowPass ? (
              <EyeSlash size={22} color={appColors.gray} />
            ) : (
              <Eye size={22} color={appColors.gray}>
                Hide
              </Eye>
            )
          ) : (
            value.length > 0 && allowClear && <Text>Clear</Text>
          )}
        </TouchableOpacity>
      </View>
      {suffix ?? suffix}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    borderColor: appColors.gray2,
    width: "100%",
    justifyContent: "center",
    minHeight: 56,
    backgroundColor: appColors.white,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    color: appColors.black,
    fontSize: 16,
  },
});
