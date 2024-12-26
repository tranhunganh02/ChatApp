import { View, Text, Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { appInfo, getDeviceType } from "@/constants/appInfors";
import IconButtonComponent from "../IconButtonComponent";
import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import RowComponent from "../RowComponent";
import InputComponent from "../InputComponent";
import SpaceComponent from "../SpaceComponent";

interface SendAndInputComponentProps {
  messageContent: string;
  setMessageContent: (content: string) => void;
  sendTextMessage: () => void;
  onSendImage: () => void;
  onSendFile: () => void;
  onSendVideo: () => void;
}

const SendAndInputComponent = ({
  messageContent,
  setMessageContent,
  sendTextMessage,
  onSendImage,
  onSendFile,
  onSendVideo
}: SendAndInputComponentProps) => {
  const height = appInfo.sizes.HEIGHT;
  const width = appInfo.sizes.WIDTH;
  const typeDevice = getDeviceType();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const closeMenu = () => {
    setIsOpenMenu(false);
  };
  const toggleMenu = () => {
    setIsOpenMenu((prev) => !prev);
  };
  return (
    <View
      style={{
        borderTopWidth: 1,
        width: width - 1,
        height: height * 0.08,
        borderTopColor: "#EDEDED",
        position: "absolute",
        bottom: -10,
        justifyContent: "center",
        paddingHorizontal:
          typeDevice === "mobile medium"
            ? 4
            : typeDevice === "tablet"
            ? 4
            : 4,
      }}
    >
      <RowComponent justify="space-between">
      {isOpenMenu && (
        <View style={{ position: "absolute",
          bottom: 50,
          backgroundColor: "#fff",
          borderRadius: 8,
          padding: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,}}>
          <IconButtonComponent icon={<Ionicons size={24} name="document-attach" />} onPress={onSendFile}/>
          <IconButtonComponent icon={<MaterialCommunityIcons size={24} name="file-video" onPress={onSendVideo} />} />
          <IconButtonComponent icon={<MaterialCommunityIcons size={24} name="cancel" />} onPress={closeMenu} />
        </View>
      )}
        <IconButtonComponent
          icon={<MaterialCommunityIcons name="attachment" size={24} />}
          onPress={toggleMenu}
        />
        <InputComponent
          customStyle={{
            width: typeDevice === "mobile large" ? "50%" : "60%",
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
            icon={<Ionicons name="image" size={24} onPress={onSendImage} />}
          />

        <SpaceComponent width={6} />
          <IconButtonComponent
            icon={<Ionicons name="send-sharp" size={24} />}
            onPress={sendTextMessage}
          />
        </RowComponent>
      </RowComponent>
    </View>
  );
};

export default SendAndInputComponent;
