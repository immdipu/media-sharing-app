import { Role } from "./role";

export interface membersTypes {
  _id: string;
  fullName: string;
  username: string;
  profilePic: string;
  verified: boolean;
  role: Role;
  followers: number;
  following: number;
}

export interface RoomTypes {
  _id: number;
  name: string;
  membersLimit: number;
  admin: membersTypes;
  members: membersTypes[];
  moderators: membersTypes[];
  bannedUsers: string[];
  createdAt: Date;
}

export type RoomChatTypes = RoomJoinLeaveTypes | RoomMessageTypes;

export interface RoomJoinLeaveTypes {
  Type: "JoinLeaveNotification";
  status: "joined" | "left";
  user: membersTypes;
  createdAt: Date;
}

export interface RoomMessageTypes {
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
}
