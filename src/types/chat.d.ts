declare enum chatContentTypes {
  text = "text",
  image = "image",
  video = "video",
  audio = "audio",
  document = "document",
  location = "location",
  contact = "contact",
}

interface ChatMessageTextTypes {
  chatId: string;
  type: chatContentTypes.text;
  content: string;
  senderId: string;
  to: string;
  createdAt: string;
  tempId?: string;
}

type ChatMessageTypes = ChatMessageTextTypes;
