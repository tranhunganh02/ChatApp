import { View, Text, Image, FlatList } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ContainerComponent,
  IconButtonComponent,
  MessageItemComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "@/components";
import { Ionicons } from "@expo/vector-icons";
import { appColors } from "@/constants/appColor";
import fontFamilies from "@/constants/fontFamilies";
import { globalStyles } from "@/styles/globalStyles";
import SendAndInputComponent from "@/components/roomChat/SendAndInputComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessages,
  fetchMessages,
  selectMessages,
} from "@/state/reducers/messageReducer";
import { authSelector, AuthState } from "@/state/reducers/authReducer";
import { AppDispatch } from "@/state/store";
import webSocketService from "@/services/WebSocketService";
import { appInfo } from "@/constants/appInfors";

export default function Page() {
  const { id, username, image, isGroup } = useLocalSearchParams();
  const recipientId = parseInt(id as string);
  const isGroupBoolean = Array.isArray(isGroup)
    ? isGroup[0] === "true"
    : isGroup === "true";

  const auth: AuthState = useSelector(authSelector);

  const { messages, loading, error } = useSelector(selectMessages);
  const dispatch = useDispatch<AppDispatch>();
  const route = useRouter();

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (auth && auth.accessToken) {
      webSocketService
        .connect(auth.accessToken)
        .then(() => {
          console.log("WebSocket connected successfully");
        })
        .catch((error) => {
          console.error("Failed to connect WebSocket:", error);
        });
    }

    return () => {
      webSocketService.disconnect();
    };
  }, [auth]);

  useEffect(() => {
    if (auth && auth.accessToken) {
      dispatch(
        fetchMessages({
          recipientId: parseInt(id as string),
          accessToken: auth.accessToken,
        })
      );
    }
    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch, id, auth]);

  const [messageContent, setMessageContent] = useState("");

  const sendTextMessage = () => {
    try {
      webSocketService.sendTextMessage(
        recipientId,
        messageContent,
        isGroupBoolean
      );
      setMessageContent("");
      flatListRef.current?.scrollToEnd({ animated: true });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <ContainerComponent>
      <SectionComponent styles={[globalStyles.shadow, { width: "100%" }]}>
        <RowComponent justify="space-between">
          <IconButtonComponent
            icon={<Ionicons name="arrow-back" size={22} />}
            onPress={() => route.back()}
          />
          <RowComponent>
            {image ? (
              <Image
                source={{ uri: image + "" }}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
            ) : (
              <Image
                source={require("@/assets/images/avatar_default.jpeg")}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
            )}

            <SectionComponent>
              <TextComponent
                text={username.toString()}
                font={fontFamilies.acmeRegular.fontFamily}
                size={24}
              />
              <TextComponent text={"active now"} color={appColors.gray} title />
            </SectionComponent>
          </RowComponent>
          <SpaceComponent width={4} />
          <RowComponent>
            <IconButtonComponent
              icon={<Ionicons name="call-outline" size={22} />}
            />
            <IconButtonComponent
              icon={<Ionicons name="videocam-outline" size={24} />}
            />
          </RowComponent>
        </RowComponent>
      </SectionComponent>

      <SectionComponent
        styles={{
          width: "100%",
          height: appInfo.sizes.HEIGHT * 0.74,
        }}
      >
        <FlatList
          ref={flatListRef}
          style={{
            paddingHorizontal: 16,
          }}
          data={messages}
          renderItem={({ item }) => (
            <MessageItemComponent message={item} currentUserId={auth.userId} />
          )}
          keyExtractor={(item) => item.id.toString()}
          extraData={messages}
        />
      </SectionComponent>

      <SendAndInputComponent
        messageContent={messageContent}
        setMessageContent={setMessageContent}
        sendTextMessage={sendTextMessage}
      />
    </ContainerComponent>
  );
}
