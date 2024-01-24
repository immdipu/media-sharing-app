export enum chatContentTypes {
  text = "text",
  image = "image",
  video = "video",
  audio = "audio",
  document = "document",
  location = "location",
  contact = "contact",
}

export interface ChatMessageTextTypes {
  chatId: string;
  type: chatContentTypes.text;
  content: string;
  senderId: string;
  createdAt: string;
  tempId?: string;
}

export type ChatMessageTypes = ChatMessageTextTypes;
