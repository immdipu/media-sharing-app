export interface SingleFollowerTypes {
  _id: string;
  fullName: string;
  username: string;
  profilePic: string;
  isFollowing: boolean;
  isAFollower: boolean;
}

export interface GetAllFollowersTypes {
  success: boolean;
  message: string;
  data: SingleFollowerTypes[];
}

export interface SingleGetAllChatTypes {
  _id: string;
  createdAt: string;
  unreadMessagesCount: number;
  lastMessage: string;
  user: {
    _id: string;
    fullName: string;
    username: string;
    profilePic: string;
  };
}

export interface GetAllChatsTypes {
  success: boolean;
  message: string;
  data: SingleGetAllChatTypes[];
}
