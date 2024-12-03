import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { appInfo, getDeviceType } from "@/constants/appInfors";
import IconButtonComponent from "../IconButtonComponent";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import RowComponent from "../RowComponent";
import InputComponent from "../InputComponent";
import SpaceComponent from "../SpaceComponent";

interface SendAndInputComponentProps {
  messageContent: string;
  setMessageContent: (content: string) => void;
  sendTextMessage: () => void;
  onSendFile: () => void;
}

const SendAndInputComponent = ({
  messageContent,
  setMessageContent,
  sendTextMessage,
  onSendFile,
}: SendAndInputComponentProps) => {
  const height = appInfo.sizes.HEIGHT;
  const width = appInfo.sizes.WIDTH;
  const typeDevice = getDeviceType();

  return (
    <View
      style={{
        borderTopWidth: 1,
        width: width - 1,
        height: height * 0.08,
        borderTopColor: "#EDEDED",
        position: "absolute",
        bottom: 0,
        justifyContent: "center",
        paddingHorizontal:
          typeDevice === "mobile medium"
            ? 16
            : typeDevice === "tablet"
            ? 22
            : 30,
      }}
    >
      <RowComponent justify="space-between">
        <IconButtonComponent
          icon={<MaterialCommunityIcons name="attachment" size={24} />}
        />
        <InputComponent
          customStyle={{
            width: typeDevice === "mobile medium" ? "65%" : "75%",
            height: appInfo.sizes.HEIGHT * 0.0492,
            borderWidth: 0.8,
            borderRadius: 12,
            borderColor: "#EDEDED",
            backgroundColor: "#F3F6F6",
            padding: 4,
          }}
          colorText="#797C7B"
          value={messageContent}
          placeholder="Write your message"
          onChange={(val) => setMessageContent(val)}
          type="default"
        />
        {/* <SpaceComponent width={20}/> */}
        <RowComponent>
          <IconButtonComponent
            icon={<Ionicons name="image" size={22} onPress={onSendFile} />}
          />
          <SpaceComponent width={6} />
          <IconButtonComponent
            icon={<Ionicons name="send-sharp" size={22} />}
            onPress={sendTextMessage}
          />
        </RowComponent>
      </RowComponent>
    </View>
  );
};

export default SendAndInputComponent;
