import { RoomType } from "./enums";
import { Role } from "./role";
import { roomActivityTypes } from "./roomActivity";

export interface membersTypes {
  _id: string;
  fullName: string;
  username: string;
  profilePic: string;
  verified: boolean;
}

export interface RoomTypes {
  id: string;
  name: string;
  membersLimit: number;
  admin: membersTypes;
  members: membersTypes[];
  moderators: membersTypes[];
  bannedUsers: string[];
  createdAt: Date;
  roomActivity: roomActivityTypes[];
  invited: string[];
  roomType: RoomType;
}

export type RoomChatTypes =
  | RoomJoinLeaveTypes
  | RoomMessageTypes
  | RoomUpdateMessageTypes
  | MessageReactionTypes;

export interface MessageReactionDataTypes {
  sender: {
    _id: string;
  };
  emoji: string;
  msgId: string;
  createdAt: Date;
}

export interface MessageReactionTypes {
  Type: "MsgReaction";
  roomId: string;
  data: MessageReactionDataTypes;
}

export interface RoomUpdateMessageTypes {
  Type: "RoomUpdate";
  message: string;
  updatedBy: string;
  createdAt: Date;
}
export interface RoomJoinLeaveTypes {
  Type: "JoinLeaveNotification";
  status: "joined" | "left";
  user: membersTypes;
  createdAt: Date;
}

export interface ReactionTypes extends MessageReactionDataTypes {
  sender: membersTypes;
}

export interface RoomMessageTypes {
  _id: string;
  Type:
    | "message"
    | "image"
    | "video"
    | "audio"
    | "file"
    | "location"
    | "contact"
    | "sticker"
    | "gif"
    | "poll"
    | "reply"
    | "forwarded"
    | "system";
  content: string;
  sender: membersTypes;
  createdAt: Date;
  reactions: ReactionTypes[];
}

export interface ActivityTypes {
  type:
    | "ADD_MEMBER_FROM_ACTIVITY"
    | "REMOVE_MEMBER_FROM_ACTIVITY"
    | "REMOVE_ACTIVITY";
  activityId: string;
  roomId: string;
  userId: string;
  adminId: string;
}
