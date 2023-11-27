import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loginResponseTypes } from "@/types/userTypes";
import { Role } from "@/types/role";
import { RoomTypes, RoomChatTypes, membersTypes } from "@/types/room";

interface initialStateProps {
  Room: RoomTypes[] | null;
  JoinedRoom: RoomTypes | null;
  RoomChat: RoomChatTypes[] | null;
  RoomJoiningLoader: boolean;
}

const initialState: initialStateProps = {
  Room: null,
  JoinedRoom: null,
  RoomChat: null,
  RoomJoiningLoader: false,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    AddNewRoom: (state, action: PayloadAction<RoomTypes>) => {
      if (state.Room) {
        state.Room.push(action.payload);
      } else {
        state.Room = [action.payload];
      }
    },

    AddAllRoom: (state, action: PayloadAction<RoomTypes[]>) => {
      state.Room = action.payload;
    },

    JoinRoom: (state, action: PayloadAction<RoomTypes>) => {
      state.JoinedRoom = action.payload;
    },

    AddMessage: (state, action: PayloadAction<RoomChatTypes>) => {
      if (state.RoomChat) {
        state.RoomChat.push(action.payload);
      } else {
        state.RoomChat = [action.payload];
      }
    },
    AddNewMemeberToTheRoom: (state, action: PayloadAction<membersTypes>) => {
      const user = action.payload;
      const userAlreadyExist = state.JoinedRoom?.members?.find(
        (member) => member._id === user._id,
      );
      if (!userAlreadyExist) {
        state.JoinedRoom?.members?.push(user);
      }
    },
    RemoveMemberFromRoom: (state, action: PayloadAction<membersTypes>) => {
      const user = action.payload;
      const userExist = state.JoinedRoom?.members.find(
        (member) => member._id === user._id,
      );
      if (state.JoinedRoom && userExist) {
        const RemoveUser = state.JoinedRoom?.members.filter(
          (memeber) => memeber._id !== user._id,
        );
        state.JoinedRoom.members = RemoveUser;
      }
    },

    UpdateRoom: (state, action: PayloadAction<RoomTypes>) => {
      if (state.JoinedRoom) {
        state.JoinedRoom = action.payload;
      }
    },

    StopRoomJoiningLoader: (state) => {
      state.RoomJoiningLoader = false;
    },
    StartRoomJoiningLoader: (state) => {
      state.RoomJoiningLoader = true;
    },
  },
});

export const {
  AddNewRoom,
  JoinRoom,
  AddAllRoom,
  AddMessage,
  AddNewMemeberToTheRoom,
  RemoveMemberFromRoom,
  StopRoomJoiningLoader,
  StartRoomJoiningLoader,
} = roomSlice.actions;
export default roomSlice.reducer;
