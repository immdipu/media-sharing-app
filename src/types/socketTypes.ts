import { MessageTypes } from "./ApiResponseTypes";
import { RoomTypes } from "./room";
import { ActivityType, roomActivityTypes } from "./roomActivity";

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

export interface IAddActivity {
  type: ActivityType;
  room: string;
  admin: string;
  data: object;
}

export interface IRemoveActivity {
  type: "REMOVE_ACTIVITY";
  activityId: string;
  roomId: string;
  userId: string;
  adminId: string;
}

export enum updateMessageTypes {
  "UPDATE_SENT_MESSAGE" = "UPDATE_SENT_MESSAGE",
  "UPDATE_DELIVERED_MESSAGE" = "UPDATE_DELIVERED_MESSAGE",
  "UPDATE_SEEN_MESSAGE" = "UPDATE_SEEN_MESSAGE",
}

export interface IUpdateSentMessage {
  type: updateMessageTypes.UPDATE_SENT_MESSAGE;
  message: MessageTypes;
}

export type updateMessageDataTypes = IUpdateSentMessage;
