import { Timestamp } from "react-native-reanimated/lib/typescript/reanimated2/commonTypes";
import { User } from "../user/user";


export interface Chat {
  id: number;
  isGroup: boolean;
  chatImage: string | null;
  createdAt: string;
  user: User;
  members: User[];
}