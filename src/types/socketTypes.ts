import { RoomTypes } from "./room";

export interface IjoinedRoomResponse {
  success: boolean;
  message: string;
  room: RoomTypes;
}

export interface EditRoomTypes {
  type: "EditRoom";
  name: string;
  membersLimit: number;
  user: string;
  roomId: string;
}

interface RoleTransferTypes {
  type: "RoleTransfer";
  user: string;
}

interface KickUserTypes {
  type: "KickUser";
  user: string;
}

export type RoomUpdateTypes = EditRoomTypes | RoleTransferTypes | KickUserTypes;

export type RoomUpdateResponseTypes =
  | RoomEditResponseTypes
  | RoomRoleTransferResponseTypes;

interface RoomEditResponseTypes {
  type: "EditRoom";
  room: RoomTypes;
}

interface RoomRoleTransferResponseTypes {
  type: "RoleTransfer";
  user: string;
  role: string;
}
