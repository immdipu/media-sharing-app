import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface initialStateProps {
  showRightSidebar: boolean;
  Messages: MessageTypes[];
  AllChats: SingleGetAllChatTypes[];
}

const initialState: initialStateProps = {
  showRightSidebar: false,
  Messages: [],
  AllChats: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    ToggleRightSidebar: (state) => {
      state.showRightSidebar = !state.showRightSidebar;
    },
    LoadAllChats: (state, action: PayloadAction<SingleGetAllChatTypes[]>) => {
      state.AllChats = action.payload;
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

export const {
  ToggleRightSidebar,
  LoadAllMessages,
  AddNewMessage,
  LoadAllChats,
} = chatSlice.actions;
export default chatSlice.reducer;
