import { Alert } from "react-native";
import axiosClient from "./axiosClient";
import { appInfo } from "@/constants/appInfors";

export interface Message {
  id: number;
  type: string;
  content: string | null;
  timestamp: string;
  fileResponses: any | null;
  callResponse: any | null;
  sender_id: number;
  chat_id: number;
}

class MessageAPI {
  getMessagesByRecipientId = async (
    recipientId: number,
    accessToken: string
  ): Promise<Message[]> => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axiosClient.get(
      `/messages/users/${recipientId}`,
      config
    );

    return response.data;
  };

  getMessagesByChatId = async (chatId: number, accessToken: string) => {};

  uploadFile = async (
    recipientId: number | null,
    chatId: number | null,
    token: string,
    files: any[],
    isGroup: boolean
  ) => {
    const formData = new FormData();

    const appendFilePromises = files.map(async (file) => {
      const uri = file.uri;
      let name = file.fileName;

      try {
        const response = await fetch(uri);
        const blob = await response.blob();

        formData.append("files", blob, name);
      } catch (error) {
        console.error("Lỗi khi tải file:", error);
        Alert.alert("Lỗi", "Không thể tải file.");
        return;
      }
    });

    await Promise.all(appendFilePromises);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    let url = "";
    if (isGroup) {
      if (!chatId) {
        Alert.alert("Lỗi", "Chat ID không hợp lệ cho nhóm.");
        return;
      }
      url = `${appInfo.BASE_URL}messages/groups/files/${chatId}`;
    } else {
      if (!recipientId) {
        Alert.alert("Lỗi", "Recipient ID không hợp lệ cho người dùng.");
        return;
      }
      url = `${appInfo.BASE_URL}messages/users/files/${recipientId}`;
    }

    try {
      const response = await axiosClient.post(url, formData, config);
      return response.data;
      return "response.data";
    } catch (error) {
      console.error("Lỗi khi tải file:", error);
      Alert.alert("Lỗi", "Không thể tải lên file.");
      throw error;
    }
  };
}

const messageAPI = new MessageAPI();
export default messageAPI;
