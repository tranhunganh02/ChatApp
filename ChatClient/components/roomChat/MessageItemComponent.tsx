import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { appColors } from "@/constants/appColor";
import { Message, MessageType } from "@/data";
import { Image } from "expo-image";
import { appInfo } from "@/constants/appInfors";
import { formatDate } from "@/utils/date";

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
              const isImage = file.file_url?.match(/\.(jpeg|jpg|gif|png)$/);
              const fileName = `${file.file_url?.split("/").pop()}`;

              if (isImage) {
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
              } else {
                return (
                  <View key={index}>
                    <Text
                      style={[
                        styles.messageText,
                        { color: isCurrentUser ? "#FFFFFF" : "#000000" },
                      ]}
                    >
                      Tệp tin: {file.file_name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        console.log("Mở tệp", file.file_url);
                        // Thực hiện hành động mở hoặc tải tệp
                      }}
                    >
                      <Text style={{ color: "#1E90FF" }}>Tải về</Text>
                    </TouchableOpacity>
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
