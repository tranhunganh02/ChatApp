import { Alert } from "react-native";
import SockJS from "sockjs-client";
import { Client, Frame, IMessage } from "@stomp/stompjs";
import { Message } from "@/apis/messageApi";
import store from "@/state/store";
import { addMessage } from "@/state/reducers/messageReducer";

class WebSocketService {
  private stompClient: Client | null = null;
  private token: string | null = null;

  async connect(token: string): Promise<void> {
    this.token = token;
    console.log("Attempting to connect with token:", this.token);

    if (this.stompClient && this.stompClient.active) {
      this.disconnect();
    }

    const socket = new SockJS("http://192.168.0.113:8080/ws");
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

        // Optional: Retry connection after a delay
        setTimeout(() => this.connect(this.token!), 5000); // Retry after 5 seconds
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
      const destination = isGroup
        ? "/app/group.sendMessage"
        : "/app/user.sendTextMessage";
      const message = isGroup
        ? { chat_id: recipientId, content, message_type: "TEXT" }
        : { recipient_id: recipientId, content, message_type: "TEXT" };

      try {
        this.stompClient.publish({
          destination: destination,
          body: JSON.stringify(message),
        });
        console.log(`Gửi tin nhắn đến ${destination}: ${content}`);
      } catch (error) {
        console.error("Lỗi gửi tin nhắn:", error);
        Alert.alert("Lỗi", "Không thể gửi tin nhắn. Vui lòng thử lại.");
      }
    } else {
      console.error("Không có kết nối", "Vui lòng kêt nối WebSocket trước.");
      Alert.alert("Lỗi kết nối", "Không thể gửi tin nhắn. Vui lòng thử lại.");
    }
  }

  sendFileMessage(messageResponse: Message) {
    if (this.stompClient && this.stompClient.active) {
      const destination = "/app/sendFileMessage";

      try {
        this.stompClient.publish({
          destination: destination,
          body: JSON.stringify(messageResponse),
        });
      } catch (error) {
        console.error("Lỗi khi gửi tin nhắn:", error);
        Alert.alert(
          "Lỗi gửi tin nhắn",
          "Không thể gửi tin nhắn. Vui lòng thử lại."
        );
      }
    } else {
      Alert.alert("Lỗi kết nối", "Không thể gửi tin nhắn. Vui lòng thử lại.");
    }
  }

  subscribeToMessages() {
    if (this.stompClient && this.stompClient.active) {
      console.log("Subscribing to messages...");

      this.stompClient.subscribe(
        "/user/queue/messages",
        (message: IMessage) => {
          console.log(
            "Received message from /user/queue/messages:",
            message.body
          );
          const parsedMessage: Message = JSON.parse(message.body);
          store.dispatch(addMessage(parsedMessage));
        }
      );

      this.stompClient.subscribe("/user/queue/reply", (message: IMessage) => {
        console.log("Received message from /user/queue/reply:", message.body);
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
