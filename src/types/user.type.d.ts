interface signupParamsTypes {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

interface loginResponseTypes {
  fullName: string;
  username: string;
  _id: string;
  profilePic: string;
  token?: string;
  role: Role;
  email: string;
  verified: boolean;
}

interface AddMediaDataTypes {
  id: string;
  original_title?: string;
  name?: string;
  title?: string;
  backdrop_path?: string;
  poster_path?: string;
  media_type: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  type?: "history" | "watchlist" | "favorite";
}

interface AddMediaResponse extends AddMediaDataTypes {
  createdAt: string;
  _id: string;
  Index: number;
}

interface feedbackDataTypes {
  name?: string;
  user?: string;
  message: string;
}

interface getUserDataTypes {
  _id: string;
  createdAt: string;
  fullName: string;
  profilePic: string;
  username: string;
  followers: number;
  following: number;
  ownProfile: boolean;
  isFollowing: boolean;
  isAFollower: boolean;
  email?: string;
  bio: string;
}

interface EditProfileDataTypes {
  _id: string;
  createdAt: string;
  fullName: string;
  profilePic: string;
  username: string;
  followers: number;
  following: number;
  ownProfile: boolean;
  isFollowing: boolean;
  bio: string;
}

interface userList {
  _id: string;
  fullName: string;
  username: string;
  profilePic: string;
  role: Role;
  isFollowing: boolean;
}

interface getUserListTypes {
  data: userList[];
  page: number;
  results: number;
}

interface FollowFollowersTypes {
  _id: string;
  fullName: string;
  username: string;
  profilePic: string;
  isFollowing: boolean;
  isAFollower: boolean;
  role: Role;
}

interface FollowFollowingList {
  followers: FollowFollowersTypes[];
  following: FollowFollowersTypes[];
}
