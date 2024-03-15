interface ActivityTypes {
  type:
    | "ADD_MEMBER_FROM_ACTIVITY"
    | "REMOVE_MEMBER_FROM_ACTIVITY"
    | "REMOVE_ACTIVITY"
    | "ACCEPT_JOIN_REQUEST"
    | "REJECT_JOIN_REQUEST";
  activityId: string;
  roomId: string;
  userId: string;
  adminId: string;
}

interface IActivityYouTubeTypes {
  id: string;
  status: string;
  data: {
    videoId?: string;
    thumbnail?: string;
  };
  ActivityType: ActivityType;
  users: membersTypes[];
  admin: membersTypes;
  createdAt: Date;
}

interface IActivityDrawingTypes {
  id: string;
  status: string;
  data: {
    elements?: any;
    thumbnail: string;
  };
  ActivityType: ActivityType;
  users: membersTypes[];
  admin: membersTypes;
  createdAt: Date;
}

interface IGetActivityTypes {
  activityId: string;
  ActivityType: ActivityType;
  data: {};
}

type roomActivityTypes = IActivityYouTubeTypes | IActivityDrawingTypes;

interface IRemoveActivity {
  type: "REMOVE_ACTIVITY";
  activityId: string;
  roomId: string;
  userId: string;
  adminId: string;
}

interface IAddActivity {
  type: ActivityType;
  room: string;
  admin: string;
  data: object;
}

interface ActivityUpdateResponseTypes {
  type: "AnActivityUpdate";
  activity: roomActivityTypes;
}

interface ActivityDeleteResponseTypes {
  type: "ActivityDeleted";
  activityId: string;
}

interface UpdateAllActivityResponseTypes {
  type: "REMOVE_USER_FROM_ALL_ACTIVITY";
  activities: roomActivityTypes;
}
