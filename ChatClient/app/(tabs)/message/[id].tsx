import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, Image, FlatList, Alert } from "react-native";
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
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import {
  clearMessages,
  fetchGroupMessages,
  fetchSingleMessages,
  selectMessages,
  uploadFile,
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
      isGroupBoolean === true
        ? dispatch(
            fetchGroupMessages({
              chatId: parseInt(id as string),
              accessToken: auth.accessToken,
            })
          )
        : dispatch(
            fetchSingleMessages({
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
      console.error("Error sending message:", error);
    }
  };

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      try {
        const response = await dispatch(
          uploadFile({
            recipientId,
            chatId: isGroup ? recipientId : null,
            accessToken: auth.accessToken,
            files: result.assets,
            isGroup: isGroupBoolean,
            fromMobile: false,
          })
        );

        if (response.payload) {
          webSocketService.sendFileMessage(response.payload);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleFilePick = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: true,
      });

      if (!result.canceled && result.assets.length > 0) {
        try {
          const response = await dispatch(
            uploadFile({
              recipientId,
              chatId: isGroup ? recipientId : null,
              accessToken: auth.accessToken,
              files: result.assets,
              isGroup: isGroupBoolean,
              fromMobile: false,
            })
          );

          if (response.payload) {
            webSocketService.sendFileMessage(response.payload);
          }
          flatListRef.current?.scrollToEnd({ animated: true });
        } catch (error) {
          Alert.alert("Error", "Unable to send file");
        }
      }
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };

  useLayoutEffect(() => {
    if (flatListRef.current && messages.length) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 1000);
    }
  }, [messages]); // Triggered when messages change

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
                source={{ uri: image+"" }}
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
              <TextComponent text="Active now" color={appColors.gray} title />
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
          initialScrollIndex={messages.length + 1}
          data={messages}
          renderItem={({ item }) => (
            <MessageItemComponent message={item} currentUserId={auth.userId} />
          )}
          keyExtractor={(item) => item.id.toString()}
          extraData={messages}
          // onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
      </SectionComponent>

      <SendAndInputComponent
        messageContent={messageContent}
        setMessageContent={setMessageContent}
        sendTextMessage={sendTextMessage}
        onSendImage={handleImagePick}
        onSendFile={handleFilePick}
      />
    </ContainerComponent>
  );
}
