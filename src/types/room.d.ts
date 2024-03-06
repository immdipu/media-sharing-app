enum updateMessageTypes {
  "UPDATE_SENT_MESSAGE" = "UPDATE_SENT_MESSAGE",
  "UPDATE_DELIVERED_MESSAGE" = "UPDATE_DELIVERED_MESSAGE",
  "UPDATE_SEEN_MESSAGE" = "UPDATE_SEEN_MESSAGE",
}

interface RoomTypes {
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

type RoomChatTypes =
  | RoomJoinLeaveTypes
  | RoomMessageTypes
  | RoomUpdateMessageTypes
  | MessageReactionTypes
  | MessageReplyTypes;

interface MessageReactionDataTypes {
  sender: {
    _id: string;
  };
  emoji: string;
  msgId: string;
  createdAt: Date;
}

interface RoomUpdateMessageTypes {
  Type: "RoomUpdate";
  message: string;
  updatedBy: string;
  createdAt: Date;
}

interface RoomJoinLeaveTypes {
  Type: "JoinLeaveNotification";
  status: "joined" | "left";
  user: membersTypes;
  createdAt: Date;
}

interface DefaultMessageTypes {
  _id: string;
  content: string;
  sender: membersTypes;
  createdAt: Date;
  reactions: ReactionTypes[];
}

interface MessageReplyTypes extends DefaultMessageTypes {
  Type: "reply";
  replyTo: string | RoomMessageTypes | null;
}

interface MessageReactionTypes {
  Type: "MsgReaction";
  roomId: string;
  data: MessageReactionDataTypes;
}

interface membersTypes {
  _id: string;
  fullName: string;
  username: string;
  profilePic: string;
  verified: boolean;
}

interface ReactionTypes extends MessageReactionDataTypes {
  sender: membersTypes;
}

interface EmojisPopOverProps {
  children: React.ReactNode;
  showEmojis: boolean;
  setShowEmojis: React.Dispatch<React.SetStateAction<boolean>>;
  messageId: string;
  reactions: ReactionTypes[];
}

interface RoomMessageTypes extends DefaultMessageTypes {
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
    | "forwarded"
    | "system";
}

type RoomUpdateResponseTypes =
  | RoomEditResponseTypes
  | RoomRoleTransferResponseTypes
  | ActivityUpdateResponseTypes
  | ActivityDeleteResponseTypes
  | UpdateAllActivityResponseTypes;

interface RoomEditResponseTypes {
  type: "EditRoom";
  room: RoomTypes;
}

interface IjoinedRoomResponse {
  success: boolean;
  message: string;
  room: RoomTypes;
}

interface EditRoomTypes {
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

type RoomUpdateTypes = EditRoomTypes | RoleTransferTypes | KickUserTypes;

interface RoomRoleTransferResponseTypes {
  type: "RoleTransfer";
  AdminId: string;
  roomId: string;
  ToTransferId: string;
}

interface IUpdateSentMessage {
  type: updateMessageTypes.UPDATE_SENT_MESSAGE;
  message: MessageTypes;
}

type updateMessageDataTypes = IUpdateSentMessage;
