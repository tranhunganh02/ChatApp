import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  userId: number;
  avatar: string;
  accessToken: string;
}

const initialState: AuthState = {
  userId: 0,
  avatar: "",
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authData: initialState,
  },
  reducers: {
    addAuth: (state, action: PayloadAction<AuthState>) => {
      state.authData = action.payload;
    },

    removeAuth: (state) => {
      state.authData = initialState;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { addAuth, removeAuth } = authSlice.actions;

export const authSelector = (state: any) => state.authReducer.authData;
