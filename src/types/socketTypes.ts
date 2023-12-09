import { RoomTypes } from "./room";
import { roomActivityTypes } from "./roomActivity";

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
  | RoomRoleTransferResponseTypes
  | ActivityUpdateResponseTypes
  | ActivityDeleteResponseTypes
  | UpdateAllActivityResponseTypes;

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

interface ActivityUpdateResponseTypes {
  type: "AnActivityUpdate";
  activity: roomActivityTypes;
}

export interface ActivityDeleteResponseTypes {
  type: "ActivityDeleted";
  activityId: string;
}

export interface UpdateAllActivityResponseTypes {
  type: "REMOVE_USER_FROM_ALL_ACTIVITY";
  activities: roomActivityTypes;
}
