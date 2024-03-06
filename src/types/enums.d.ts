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
