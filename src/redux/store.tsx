import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/redux/slice/authSlice";
import roomSlice from "@/redux/slice/roomSlice";
import chatSlice from "@/redux/slice/chatSlice";

export const store = configureStore({
  reducer: {
    auth: userSlice,
    room: roomSlice,
    chat: chatSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
