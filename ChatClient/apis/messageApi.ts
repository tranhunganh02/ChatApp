import axiosClient from "./axiosClient";

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
}

const messageAPI = new MessageAPI();
export default messageAPI;
