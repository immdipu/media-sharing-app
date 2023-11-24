import { RoomTypes } from "./room";

export interface IjoinedRoomResponse {
  success: boolean;
  message: string;
  room: RoomTypes;
}
