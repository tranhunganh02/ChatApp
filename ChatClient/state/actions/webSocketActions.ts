// import { ReadyState } from 'react-use-websocket'; // Sử dụng WebSocketReadyState từ react-use-websocket

// export const SET_SOCKET = 'SET_SOCKET';
// export const SET_READY_STATE = 'SET_READY_STATE';
// export const SET_LAST_MESSAGE = 'SET_LAST_MESSAGE';

// export interface SetSocketAction {
//   type: typeof SET_SOCKET;
//   payload: WebSocket;
// }

// export interface SetReadyStateAction {
//   type: typeof SET_READY_STATE;
//   payload: ReadyState;  // Cập nhật kiểu đúng
// }

// export interface SetLastMessageAction {
//   type: typeof SET_LAST_MESSAGE;
//   payload: string;
// }

// export type WebSocketActionTypes = SetSocketAction | SetReadyStateAction | SetLastMessageAction;

// export const setSocket = (socket: WebSocket): SetSocketAction => ({
//   type: SET_SOCKET,
//   payload: socket,
// });

// export const setReadyState = (readyState: ReadyState): SetReadyStateAction => ({
//   type: SET_READY_STATE,
//   payload: readyState,
// });

// export const setLastMessage = (message: string): SetLastMessageAction => ({
//   type: SET_LAST_MESSAGE,
//   payload: message,
// });
