import { Timestamp } from "react-native-reanimated/lib/typescript/reanimated2/commonTypes";

interface Message {
    id: number;
    type: string;
    content: string;
    timestamp: string;
    fileResponses: any;
    callResponse: any;
    senderId: number;
    chatId: number;
  }

