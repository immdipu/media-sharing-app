interface SingleFollowerTypes {
  _id: string;
  fullName: string;
  username: string;
  profilePic: string;
  isFollowing: boolean;
  isAFollower: boolean;
}

interface GetAllFollowersTypes {
  success: boolean;
  message: string;
  data: SingleFollowerTypes[];
}

interface SingleGetAllChatTypes {
  _id: string;
  createdAt: string;
  unreadMessagesCount: number;
  lastMessage?: {
    _id: string;
    chatId: string;
    content: string;
    sender: userType;
  };
  user: userType;
}

interface GetAllChatsTypes {
  success: boolean;
  message: string;
  data: SingleGetAllChatTypes[];
}

interface MessageTypes {
  _id: string;
  chatId: string;
  type: string;
  content: string;
  sender: userType;
  isEmoji: boolean;
  status: string;
  reaction: [];
  createdAt: string;
  tempId?: string;
}

interface userType {
  _id: string;
  fullName: string;
  username: string;
  profilePic: string;
}

interface SingleGetChatTypes {
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
