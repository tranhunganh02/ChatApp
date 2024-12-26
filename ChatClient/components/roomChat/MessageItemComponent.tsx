import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import { Audio, ResizeMode, Video } from "expo-av";
import { Image } from "expo-image";
import { appColors } from "@/constants/appColor";
import { appInfo } from "@/constants/appInfors";
import { Message, MessageType } from "@/data";
import { formatDate } from "@/utils/date";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import MessagingDownloadComponent from "../message/MessagingDownloadComponent";

interface MessageItemComponentProps {
  message: Message;
  currentUserId: number;
}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function MessageItemComponent({
  message,
  currentUserId,
}: MessageItemComponentProps) {
  const isCurrentUser = message.sender_id === currentUserId;

  const playAudio = async (audioUrl: string) => {
    try {
      console.log(`chuan bi phat ${audioUrl}`);
      // Fetch the audio file from the backend
      const response = await fetch(audioUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch the audio file");
      }

      // Use the URL directly
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUrl }, // Use the direct URL
        { shouldPlay: true }
      );
      console.log("Playing Sound");
      await sound.playAsync(); // Use sound here instead of soundd
    } catch (error) {
      console.error("Error playing audio", error);
    }
  };

  const downloadFile = async (fileUrl: string, fileName: string) => {
    if (Platform.OS === "web") {
      const downloadFileForWeb = async (fileUrl: string, fileName: string) => {
        try {
          const response = await fetch(fileUrl);
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);

          alert(`Tải file thành công: ${fileName}`);
        } catch (error) {
          console.error("Error downloading file for web:", error);
          alert("Có lỗi xảy ra khi tải file trên web.");
        }
      };

      return downloadFileForWeb(fileUrl, fileName);
    } else {
      try {
        const fileUri = `${FileSystem.documentDirectory}${fileName}`;
        const downloadResult = await FileSystem.downloadAsync(fileUrl, fileUri);

        if (downloadResult.status === 200) {
          console.log(`File downloaded to: ${downloadResult.uri}`);
          alert(`Tải file thành công: ${fileName}`);
        } else {
          console.error("Download failed:", downloadResult);
          alert("Không thể tải file. Vui lòng thử lại.");
        }
      } catch (error) {
        console.error("Error downloading file:", error);
        alert("Có lỗi xảy ra khi tải file.");
      }
    }
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case MessageType[MessageType.TEXT]:
        return (
          <Text
            style={[
              styles.messageText,
              { color: isCurrentUser ? "#FFFFFF" : "#000000" },
            ]}
          >
            {message.content}
          </Text>
        );

      case MessageType[MessageType.FILE]:
        return (
          <>
            {message.fileResponses?.map((file: any, index: number) => {
              const fileName = `${file.file_url?.split("/").pop()}`;
              const fileUrl =
                file.file_type === "IMAGE"
                  ? `${appInfo.BASE_URL}images/${fileName}`
                  : `${appInfo.BASE_URL}files/${fileName}`; // File URL for audio

              if (file.file_type === "IMAGE") {
                return (
                  <View key={index}>
                    <Image
                      style={styles.imagePreview}
                      source={{ uri: `${appInfo.BASE_URL}images/${fileName}` }}
                      placeholder={{ blurhash }}
                      contentFit="cover"
                      transition={1000}
                    />
                  </View>
                );
              } else if (file.file_type === "AUDIO") {
                const playAudio = async (audioUrl: string) => {
                  try {
                    console.log(`chuan bi phat ${audioUrl}`);
                    // Fetch the audio file from the backend
                    const response = await fetch(audioUrl);
                    if (!response.ok) {
                      throw new Error("Failed to fetch the audio file");
                    }
                
                    // Use the URL directly
                    const { sound } = await Audio.Sound.createAsync(
                      { uri: audioUrl }, // Use the direct URL
                      { shouldPlay: true }
                    );
                    console.log('Playing Sound');
                    await sound.playAsync(); // Use sound here instead of soundd
                
                  } catch (error) {
                    console.error("Error playing audio", error);
                  }
                };              
                return (
                  <TouchableOpacity
                    key={index}
                      onPress={() => playAudio(`${appInfo.BASE_URL}files/${fileName}`)} // Play the audio file
                    >
                  
                   <Ionicons name="play" size={24}/>
                      <Text style={{ color: "#1E90FF" }}>Phát âm thanh</Text>
                
                    </TouchableOpacity>
                );
              } 
              else if (file.file_type === "VIDEO") {
                const video = useRef(null);
                const [status, setStatus] = useState({});
                console.log("link video", `${appInfo.BASE_URL}videos/${fileName}`);
                
                return (
                  <Video
                  key={index}
                    ref={video}
                    style={{width: 150,
                      height: 180,}}
                    source={{
                      uri: `${appInfo.BASE_URL}videos/${fileName}`,
                    }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                  />
                );
              }
              else {
                return (
                  <View key={index}>
                    <MessagingDownloadComponent
                      fileUrl={fileUrl}
                      fileName={fileName}
                    />
                  </View>
                );
              }
            })}
          </>
        );

      case MessageType[MessageType.CALL]:
        if (message.callResponse) {
          return (
            <View>
              <Text
                style={[
                  styles.messageText,
                  { color: isCurrentUser ? "#FFFFFF" : "#000000" },
                ]}
              >
                Cuộc gọi {message.callResponse.callType} - Thời gian:{" "}
                {message.callResponse.duration}
              </Text>
            </View>
          );
        }
        break;
      default:
        return null;
    }
  };

  return (
    <View
      style={[
        styles.messageContainer,
        isCurrentUser ? styles.rightContainer : styles.leftContainer,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          { backgroundColor: isCurrentUser ? appColors.primary : "#F2F7FB" },
        ]}
      >
        {renderMessageContent()}
      </View>
      <Text style={styles.timeText}>{formatDate(message.timestamp)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 5,
    maxWidth: "70%",
  },
  rightContainer: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  leftContainer: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
  messageBubble: {
    borderRadius: 20,
    padding: 10,
    minHeight: 40,
    justifyContent: "center",
  },
  messageText: {
    fontSize: 16,
  },
  timeText: {
    fontSize: 12,
    color: "#A0A0A0",
    marginTop: 4,
  },
  imagePreview: {
    width: 150,
    height: 150,
    backgroundColor: "#0553",
  },
});
