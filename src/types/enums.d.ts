const Role = {
  User: "USER",
  Admin: "ADMIN",
  SuperAdmin: "SUPER_ADMIN",
} as const;

type RoleType = (typeof Role)[keyof typeof Role];

const Room = {
  public = "PUBLIC",
  friend = "FRIEND",
  private = "PRIVATE",
} as const;

type RoomType = (typeof Room)[keyof typeof Room];

const Activity = {
  YouTube = "YOUTUBE",
  Drawing = "DRAWING",
  Streaming = "STREAMING",
} as const;

type ActivityType = (typeof Activity)[keyof typeof Activity];

const chatContent = {
  text = "TEXT",
  image = "IMAGE",
  video = "VIDEO",
  audio = "AUDIO",
  document = "DOCUMENT",
  location = "LOCATION",
  contact = "CONTACT",
} as const;

type chatContentTypes = (typeof ChatContentTypes)[keyof typeof chatContent];

type updateMessageTypes = (typeof updateMessage)[keyof typeof updateMessage];
