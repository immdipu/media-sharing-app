export type chatMessageTypes =
  | "text"
  | "image"
  | "video"
  | "audio"
  | "document"
  | "location"
  | "sticker"
  | "gif"
  | "contact"
  | "poll"
  | "other";

interface chatUserTypes {
  _id: string;
  fullName: string;
  username: string;
  profilePic: string;
}

export interface ChatMessageTypes {
  chatId: string;
  type: chatMessageTypes;
  content: string;
  sender: chatUserTypes;
  createdAt: string;
  tempId?: string;
}

export type SingleFollowerTypes = chatMessageTypes;
