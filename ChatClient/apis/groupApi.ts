import axios from "axios";
import axiosClient from "./axiosClient";
import { Message } from "./messageApi";
import { Chat, User } from "@/data";

export interface GroupChatRequest {
  name: string;
  user_ids: number[];
}



class GroupApi {
    // Dùng axios để gọi API tạo nhóm
    // apiUrl = 'http://localhost:8080/api/v1/groups';
    
    // Tạo nhóm mới
    createGroup = async (groupData: GroupChatRequest, accessToken: string): Promise<Chat> => {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        try {
            const response = await axiosClient.post("/chats/groups", groupData, config);
            return response.data; // Trả về dữ liệu nhóm mới tạo
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error("Failed to create group: " + error.message);
            } else {
                throw new Error("Failed to create group: " + String(error));
            }
        }
    };
}

const groupApi = new GroupApi();
export default groupApi;