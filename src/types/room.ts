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
  id: number;
  name: string;
  membersLimit: number;
  admin: string;
  members: membersTypes[];
  moderators: string[];
  bannedUsers: string[];
  createdAt: Date;
}
