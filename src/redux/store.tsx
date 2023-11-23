import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/redux/slice/authSlice";
import roomSlice from "@/redux/slice/roomSlice";

export const store = configureStore({
  reducer: {
    auth: userSlice,
    room: roomSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
