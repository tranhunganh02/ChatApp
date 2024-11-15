import { Timestamp } from "react-native-reanimated/lib/typescript/reanimated2/commonTypes";
import { User } from "../user/user";

export interface Chat {
  id: number;
  name?: string;
  is_group: boolean;
  chat_image: string | null;
  createdAt: string;
  last_message: LastMessage;
  users: User[];
}

export interface LastMessage {
  id: number;
  type: string;
  content?: string;
  timestamp: string;
  fileResponses?: any;
  callResponse?: any;
  sender_id: number;
  chat_id: number;
}
