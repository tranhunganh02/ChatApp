// // src/components/SocketListener.tsx
// import { useEffect, useState } from 'react';
// import { WebSocketService } from '@/services/WebSocketService';
// import { useSelector } from 'react-redux';
// import { authSelector, AuthState } from '@/state/reducers/authReducer';
// import { useRouter } from 'expo-router';

// export default function SocketListener() {
//   const auth: AuthState = useSelector(authSelector);
//   const wsManager = WebSocketService.getInstance();
//   const [incomingCall, setIncomingCall] = useState<string | null>(null); // Manage state for incoming call
//   const router = useRouter();

//   useEffect(() => {
//     wsManager.connect('ws://192.168.88.163:8080/ws', auth.accessToken);
//     console.log('WebSocket connected:', wsManager);

//     // Listen for incoming messages
//     wsManager.subscribeToMessages((message: any) => {
//       console.log('Received message from server:', message);
//         if (message.type === 'CALL_VIDEO') {
//           // Handle incoming call
//           setIncomingCall(message.senderId); // Update state to show incoming call
//           router.push({
//               pathname : `/call/incoming`,
//               params : {callerId: incomingCall}
//           }); // Navigate to IncomingCallScreen
//         } else if (message.type === 'CALL_END') {
//           // Handle call end message
//           console.log('Call ended by recipient');
//         }
//       });

//     return () => {
//       wsManager.disconnect();
//       console.log('WebSocket disconnected');
//     };
//   }, [auth.accessToken]);

//   return null; // No UI component to render, it's just for WebSocket listening
// }
