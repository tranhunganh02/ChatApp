import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WebSocketState {
  isConnected: boolean;
  messages: any[];
}

const initialState: WebSocketState = {
  isConnected: false,
  messages: [],
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setConnected(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
    addMessage(state, action: PayloadAction<any>) {
      state.messages = [...state.messages, action.payload]; // Đảm bảo thêm mới vào cuối
    },
    clearMessages(state) {
      state.messages = [];
    },
  },
});

export const { setConnected, addMessage, clearMessages } = socketSlice.actions;
export const socketReducer = socketSlice.reducer;
