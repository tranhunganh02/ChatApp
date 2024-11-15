import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { callReducer } from "./reducers/callReducer";
import { messageReducer } from "./reducers/messageReducer";

const store = configureStore({
  reducer: {
    authReducer,
    callReducer,
    messageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
