import {
  Image,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
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
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import {
  clearMessages,
  fetchGroupMessages,
  fetchSingleMessages,
  selectMessages,
  uploadFile,
  uploadFileAudio,
} from "@/state/reducers/messageReducer";
import { authSelector, AuthState } from "@/state/reducers/authReducer";
import { AppDispatch } from "@/state/store";
import webSocketService from "@/services/WebSocketService";
import { appInfo } from "@/constants/appInfors";
import { Message } from "@/data";
import { Audio } from "expo-av";
import { FileType } from "@/data/chat/message";
// import FileSystem from 'expo-file-system';

interface Recording {
  sound: Audio.Sound;
  duration: string;
}

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

  const playAudio = async (audioUri: string) => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true }
      );
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing audio", error);
    }
  };

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
      console.error("Lỗi khi gửi tin nhắn:", error);
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

    if (!result.canceled) {
      if (result.assets.length > 0) {
        try {
          const response = await dispatch(
            uploadFile({
              recipientId: recipientId,
              chatId: isGroup ? recipientId : null,
              accessToken: auth.accessToken,
              files: result.assets,
              isGroup: isGroupBoolean,
              fromMobile: false,
              fileType: FileType.IMAGE
            })
          );

          if (response.payload) {
            webSocketService.sendFileMessage(response.payload);
          }

          flatListRef.current?.scrollToEnd({ animated: true });
        } catch (error) {
          console.error("Lỗi khi chọn file:", error);
        }
      }
    }
  };

  const handleFilePick = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: true,
      });

      if (!result.canceled) {
        if (result.assets && result.assets.length > 0) {
          try {
            const response = await dispatch(
              uploadFile({
                recipientId: recipientId,
                chatId: isGroup ? recipientId : null,
                accessToken: auth.accessToken,
                files: result.assets,
                isGroup: isGroupBoolean,
                fromMobile: false,
                fileType: FileType.DOCUMENT
              })
            );

            if (response.payload) {
              webSocketService.sendFileMessage(response.payload);
            }

            flatListRef.current?.scrollToEnd({ animated: true });
          } catch (error) {
            Alert.alert("Lỗi", "Không thể gửi file");
          }
        }
      }
    } catch (error) {
      console.error("Lỗi khi chọn file:", error);
    }
  };
  const handleVideoPick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: false,
        quality: 1,
      });
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const video = result.assets[0];
  
        try {
          const response = await dispatch(
            uploadFile({
              recipientId: recipientId,
              chatId: isGroup ? recipientId : null,
              accessToken: auth.accessToken,
              files: [video],
              isGroup: isGroupBoolean,
              fromMobile: true,
              fileType: FileType.VIDEO
            })
          );
  
          if (response.payload) {
            webSocketService.sendFileMessage(response.payload);
          }
  
          flatListRef.current?.scrollToEnd({ animated: true });
        } catch (error) {
          console.error("Lỗi khi gửi video:", error);
          Alert.alert("Lỗi", "Không thể gửi video.");
        }
      }
    } catch (error) {
      console.error("Lỗi khi chọn video:", error);
      Alert.alert("Lỗi", "Không thể chọn video.");
    }
  };
  
  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined} // Thêm padding cho iOS
      keyboardVerticalOffset={90} // Điều chỉnh offset (phụ thuộc vào header)
    >
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
                <TextComponent
                  text={"active now"}
                  color={appColors.gray}
                  title
                />
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
            style={{ paddingHorizontal: 16 }}
            data={messages}
            renderItem={({ item }) => (
              <MessageItemComponent
                message={item}
                currentUserId={auth.userId}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            extraData={messages}
          />
        </SectionComponent>

        {/* Thành phần nhập tin nhắn */}
        <SendAndInputComponent
          messageContent={messageContent}
          setMessageContent={setMessageContent}
          sendTextMessage={sendTextMessage}
          onSendImage={handleImagePick}
          onSendFile={handleFilePick} 
          onSendVideo={handleVideoPick}        />
        {/* <VoiceChatComponent /> */}
      </ContainerComponent>
    </KeyboardAvoidingView>
  );
}
