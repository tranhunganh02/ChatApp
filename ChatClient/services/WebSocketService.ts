// WebSocketService.ts
import { Alert } from 'react-native';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

class WebSocketService {
    private stompClient: any;
    private token: string | null = null;

    connect(token: string): Promise<void>  {
        return new Promise((resolve, reject) => {
            this.token = token;
            console.log("Attempting to connect with token:", this.token); // Log token
            const socket = new SockJS('http://localhost:8080/ws');
            this.stompClient = Stomp.over(socket);
    
            this.stompClient.connect(
                { Authorization: `Bearer ${this.token}` },
                (frame: any) => {
                    console.log(`Connected by token ${this.token} : ` + frame);
                    resolve();
                },
                (error: any) => {
                    console.error('Connection error:', error);
                    Alert.alert('Connection error', 'Unable to connect to WebSocket');
                    reject(error);
                }
            );
        });
    }
    
    disconnect() {
        if (this.stompClient) {
            this.stompClient.disconnect(() => {
                console.log('Disconnected from WebSocket');
            });
        } else {
            console.log('No active WebSocket connection to disconnect');
        }
    }

    sendMessage(recipientId: string, content: string) {
        if (this.stompClient && this.stompClient.connected) {
            const message = { recipient_id: recipientId, content };
            this.stompClient.send('/app/user.sendMessage', {}, JSON.stringify(message));
        } else {
            Alert.alert('Not connected', 'Please connect to WebSocket first');
        }
    }

    subscribeToMessages(callback: (message: any) => void) {
        if (this.stompClient) {
            this.stompClient.subscribe('/user/queue/messages', (message: any) => {
                callback(message.body);
            });
        }
    }
}

const webSocketService = new WebSocketService();
export default webSocketService;
