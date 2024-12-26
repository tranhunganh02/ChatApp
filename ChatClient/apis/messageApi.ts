import { Alert } from "react-native";
import axiosClient from "./axiosClient";
import { getInfoAsync } from "expo-file-system";
import { FileType } from "@/data/chat/message";
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
    isGroup: boolean,
    typeFile: FileType
  ) => {
    const formData = new FormData();
    let type;
    // if(typeFile== FileType.IMAGE) type = "image"
    // else if(typeFile== FileType.AUDIO) type = "audio"
    // else if(typeFile== FileType.VIDEO) type = "video"
    // else 
    type = "files"
    // Chỉ gửi một ảnh duy nhất
    files.forEach((file) => {
      formData.append(type, {
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
    console.log(`form data nhan o message APi ${JSON.stringify(formData)}`);
    try {
      const response = await axiosClient.post(url, formData, config);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tải file:", error);
      Alert.alert("Lỗi", "Không thể tải lên file.");
      return;
    }
  };
  uploadFileAudio = async (
    recipientId: number | null,
    chatId: number | null,
    token: string,
    files: string, // Đường dẫn đến file audio trên thiết bị
    isGroup: boolean
  ) => {
    const formData = new FormData();

    try {
      const fileInfo = await fetch(files);
      formData.append("files", {
        uri: fileInfo.url, // Đường dẫn file
        name: `audio_${Date.now()}.mp3`, // Lấy tên file từ đường dẫn
        type: "audio/x-m4a", // MIME type
      } as any);
    } catch (error) {
      console.error("Lỗi khi chuẩn bị file audio ở message api:", error);
      return;
    }

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
      console.log(`form data nhan o message APi ${JSON.stringify(formData)}`);

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
