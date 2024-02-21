import { membersTypes } from "./room";

export enum ActivityType {
  YouTube = "YouTube",
  Drawing = "Drawing",
  Streaming = "Streaming",
}

export interface IActivityYouTubeTypes {
  id: string;
  status: string;
  data: {
    videoId?: string;
    thumbnail?: string;
  };
  ActivityType: ActivityType.YouTube;
  users: membersTypes[];
  admin: membersTypes;
  createdAt: Date;
}

export interface IActivityDrawingTypes {
  id: string;
  status: string;
  data: {
    elements?: any;
    thumbnail: string;
  };
  ActivityType: ActivityType.Drawing;
  users: membersTypes[];
  admin: membersTypes;
  createdAt: Date;
}

export type roomActivityTypes = IActivityYouTubeTypes | IActivityDrawingTypes;

export interface IGetActivityTypes {
  activityId: string;
  ActivityType: ActivityType;
  data: {};
}
