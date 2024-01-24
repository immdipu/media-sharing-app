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
