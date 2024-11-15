import { Alert } from "react-native";
import SockJS from "sockjs-client";
import { Client, Frame, IMessage } from "@stomp/stompjs";
import { Message } from "@/apis/messageApi";
import store from "@/state/store";
import {addMessage} from "@/state/reducers/messageReducer";

class WebSocketService {
  private stompClient: Client | null = null;
  private token: string | null = null;

  async connect(token: string): Promise<void> {
    this.token = token;
    console.log("Attempting to connect with token:", this.token);

    if (this.stompClient && this.stompClient.active) {
      this.disconnect();
    }

    const socket = new SockJS("http://localhost:8080/ws");
    this.stompClient = new Client({
      webSocketFactory: () => socket as any,
      connectHeaders: {
        Authorization: `Bearer ${this.token}`,
      },
      debug: (str) => console.log(str),
      onConnect: (frame: Frame) => {
        console.log(`Connected by token ${this.token}: `, frame);
        this.subscribeToMessages();
      },
      onStompError: (frame: Frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
        Alert.alert("Connection error", "Unable to connect to WebSocket");
      },
    });

    this.stompClient.activate();
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
      console.log("Disconnected from WebSocket");
    } else {
      console.log("No active WebSocket connection to disconnect");
    }
  }

  sendTextMessage(recipientId: number, content: string, isGroup: boolean) {
    if (this.stompClient && this.stompClient.active) {
      const destination = isGroup ? "/app/group.sendTextMessage" : "/app/user.sendTextMessage";
      const message = isGroup
          ? { chat_id: recipientId, content, message_type: "TEXT" }
          : { recipient_id: recipientId, content, message_type: "TEXT" };

      console.log("Preparing to send message:");
      console.log("Destination:", destination);
      console.log("Message Body:", JSON.stringify(message));

      this.stompClient.publish({
        destination: destination,
        body: JSON.stringify(message),
      });
      console.log(`Message sent to ${destination}: ${content}`);
    } else {
      Alert.alert("Not connected", "Please connect to WebSocket first");
    }
  }

  subscribeToMessages() {
    if (this.stompClient && this.stompClient.active) {
      this.stompClient.subscribe("/user/queue/messages", (message: IMessage) => {
        const parsedMessage: Message = JSON.parse(message.body);
        store.dispatch(addMessage(parsedMessage));
      });

      this.stompClient.subscribe("/user/queue/reply", (message: IMessage) => {
        const parsedMessage: Message = JSON.parse(message.body);
        store.dispatch(addMessage(parsedMessage));
      });
    } else {
      console.error("Cannot subscribe: WebSocket connection is not active");
    }
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
