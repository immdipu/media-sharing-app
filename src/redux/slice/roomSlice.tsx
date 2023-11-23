import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loginResponseTypes } from "@/types/userTypes";
import { Role } from "@/types/role";
import { RoomTypes } from "@/types/room";

interface initialStateProps {
  Room: RoomTypes[] | null;
}

const initialState: initialStateProps = {
  Room: null,
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
  },
});

export const { AddNewRoom } = roomSlice.actions;
export default roomSlice.reducer;
