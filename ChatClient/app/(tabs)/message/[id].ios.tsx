import { Alert, Platform } from "react-native";
import mime from "mime";
import { appInfo } from "@/constants/appInfors";
import axiosClient from "@/apis/axiosClient";

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

  getMessagesByChatId = async (
    chatId: number,
    accessToken: string
  ): Promise<Message[]> => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axiosClient.get(
      `/messages/groups/${chatId}`,
      config
    );

    return response.data;
  };

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
      let name = file.fileName || file.name;

      try {
        const response = await fetch(uri);
        const blob = await response.blob();

        formData.append("files", blob, name);
      } catch (error) {
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
      url = `/messages/groups/files/${chatId}`;
    } else {
      if (!recipientId) {
        Alert.alert("Lỗi", "Recipient ID không hợp lệ cho người dùng.");
        return;
      }
      url = `/messages/users/files/${recipientId}`;
    }

    try {
      const response = await axiosClient.post(url, formData, config);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tải file:", error);
      Alert.alert("Lỗi", "Không thể tải lên file.");
      return;
    }
  };

  uploadFileMobile = async (
    recipientId: number | null,
    chatId: number | null,
    token: string,
    files: any[], // Mảng chứa một file duy nhất
    isGroup: boolean
  ) => {
    const formData = new FormData();

    // Chỉ gửi một ảnh duy nhất
    files.forEach((file) => {
      formData.append("files", {
        uri: file.uri,
        type: file.mimeType, // Đảm bảo type là mimeType
        name: file.fileName || file.name,
      } as any);
    });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Đảm bảo Content-Type là đúng
      },
    };

    let url = "";
    if (isGroup) {
      if (!chatId) {
        Alert.alert("Lỗi", "Chat ID không hợp lệ cho nhóm.");
        return;
      }
      url = `/messages/groups/files/${chatId}`;
    } else {
      if (!recipientId) {
        Alert.alert("Lỗi", "Recipient ID không hợp lệ cho người dùng.");
        return;
      }
      url = `/messages/users/files/${recipientId}`;
    }

    try {
      const response = await axiosClient.post(url, formData, config);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tải file:", error);
      Alert.alert("Lỗi", "Không thể tải lên file.");
      return;
    }
  };
}

const messageAPI = new MessageAPI();
export default messageAPI;
