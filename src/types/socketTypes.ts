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
  AdminId: string;
  roomId: string;
  ToTransferId: string;
}

interface KickUserTypes {
  type: "KickUser";
  AdminId: string;
  roomId: string;
  ToKickId: string;
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
  AdminId: string;
  roomId: string;
  ToTransferId: string;
}
