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

export interface MessageTypes {
  _id: string;
  chatId: string;
  type: string;
  content: string;
  sender: {
    _id: string;
    fullName: string;
    username: string;
    profilePic: string;
  };
  isEmoji: boolean;
  status: string;
  reaction: [];
  createdAt: string;
  tempId?: string;
}

export interface userType {
  _id: string;
  fullName: string;
  username: string;
  profilePic: string;
}

export interface SingleGetChatTypes {
  success: boolean;
  message: string;
  data: {
    chat: {
      _id: string;
      user: userType;
      messages: MessageTypes[];
    };
  };
}
