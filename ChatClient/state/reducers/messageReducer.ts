import messageAPI, { Message } from "@/apis/messageApi";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MessageState {
  messages: Message[];
  loading: boolean;
  error: string | null;
  uploadLoading: boolean;
  uploadError: string | null;
}

const initialState: MessageState = {
  messages: [],
  loading: false,
  error: null,
  uploadLoading: false,
  uploadError: null,
};

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (params: { recipientId: number; accessToken: string }, thunkAPI) => {
    const { recipientId, accessToken } = params;
    try {
      const response = await messageAPI.getMessagesByRecipientId(
        recipientId,
        accessToken
      );
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch messages"
      );
    }
  }
);

export const uploadFile = createAsyncThunk(
  "messages/uploadFile",
  async (
    params: {
      recipientId: number | null;
      chatId: number | null;
      token: string;
      files: any[];
      isGroup: boolean;
    },
    thunkAPI
  ) => {
    const { recipientId, chatId, token, files, isGroup } = params;

    try {
      const response = await messageAPI.uploadFile(
        recipientId,
        chatId,
        token,
        files,
        isGroup
      );
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Lỗi khi tải file"
      );
    }
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.messages = [];
      state.error = null;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages = [...state.messages, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMessages.fulfilled,
        (state, action: PayloadAction<Message[]>) => {
          state.loading = false;
          const existingMessageIds = new Set(state.messages.map((m) => m.id));
          state.messages = [
            ...state.messages,
            ...action.payload.filter((msg) => !existingMessageIds.has(msg.id)),
          ];
        }
      )
      .addCase(fetchMessages.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(uploadFile.pending, (state) => {
        state.uploadLoading = true;
        state.uploadError = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.uploadLoading = false;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.uploadLoading = false;
        state.uploadError = action.payload as string;
      });
  },
});

export const { clearMessages, addMessage } = messageSlice.actions;
export const messageReducer = messageSlice.reducer;

export const selectMessages = (state: any) => state.messageReducer;
