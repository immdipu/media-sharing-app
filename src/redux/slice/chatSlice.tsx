import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MessageTypes } from "@/types/ApiResponseTypes";
interface initialStateProps {
  showRightSidebar: boolean;
  Messages: MessageTypes[];
}

const initialState: initialStateProps = {
  showRightSidebar: false,
  Messages: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    ToggleRightSidebar: (state) => {
      state.showRightSidebar = !state.showRightSidebar;
    },
    LoadAllMessages: (state, action: PayloadAction<MessageTypes[]>) => {
      state.Messages = action.payload;
    },
    AddNewMessage: (state, action: PayloadAction<MessageTypes>) => {
      let NewMessages = state.Messages.filter(
        (message) => message.tempId !== action.payload.tempId,
      );
      state.Messages = [...NewMessages, action.payload];
    },
  },
});

export const { ToggleRightSidebar, LoadAllMessages, AddNewMessage } =
  chatSlice.actions;
export default chatSlice.reducer;
