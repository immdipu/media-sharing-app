import { membersTypes } from "./room";

export interface roomActivityTypes {
  id: string;
  status: string;
  data: {
    videoId?: string;
    thumbnail?: string;
  };
  ActivityType: "YouTube";
  users: membersTypes[];
  admin: membersTypes;
  createdAt: Date;
}
