// store/callSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CallState {
  incomingCall: any | null; // Thay đổi kiểu dữ liệu theo nhu cầu của bạn
}

const initialState: CallState = {
  incomingCall: null,
};

const callSlice = createSlice({
  name: 'call',
  initialState: {
    callData: initialState,
  },
  reducers: {
    setIncomingCall(state, action: PayloadAction<any>) {
      state.callData = action.payload;
    },
    resetIncomingCall(state) {
      state.callData = initialState;
    },
  },
});
export const callReducer = callSlice.reducer;
export const { setIncomingCall, resetIncomingCall } = callSlice.actions;

export const callSelector = (state: any) => state.callReducer.callData;

