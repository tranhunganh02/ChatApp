import authenticationAPI from "@/apis/authApi";
import { Chat } from "@/data";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  chats: Chat[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  chats: [],
  loading: false,
  error: null,
};

export const fetchChats = createAsyncThunk(
  "chats/fetchChats",
  async (token: string, thunkAPI) => {
    try {
      const response = await authenticationAPI.HandleAuthentication(
        "chats/user",
        token,
        undefined,
        "get"
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        // Lỗi liên quan đến access token
        return thunkAPI.rejectWithValue('Unauthorized');
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<Chat>) => {
      state.chats = [action.payload, ...state.chats];
    },
    updateChat: (state, action: PayloadAction<Chat>) => {
      state.chats = state.chats.map((chat) =>
        chat.id === action.payload.id ? { ...chat, ...action.payload } : chat
      );
    },
    clearChats: (state) => {
      state.chats = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchChats.fulfilled, (state, action: PayloadAction<Chat[]>) => {
        state.loading = false;
        action.payload.sort((a, b) => {
          const timestampA = new Date(a.last_message.timestamp).getTime();
          const timestampB = new Date(b.last_message.timestamp).getTime();
          return timestampB - timestampA;
        });
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addChat, updateChat, clearChats } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;

export const selectChats = (state: any) => state.chatReducer;
