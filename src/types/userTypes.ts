import { Role } from "./role";

export interface signupParamsTypes {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export interface loginResponseTypes {
  fullName: string;
  username: string;
  _id: string;
  profilePic: string;
  token?: string;
  role: Role;
  email: string;
  verified: boolean;
}

export interface AddMediaDataTypes {
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

export interface AddMediaResponse extends AddMediaDataTypes {
  createdAt: string;
  _id: string;
  Index: number;
}

export interface feedbackDataTypes {
  name?: string;
  user?: string;
  message: string;
}

export interface getUserDataTypes {
  _id: string;
  createdAt: string;
  fullName: string;
  profilePic: string;
  username: string;
  followers: number;
  following: number;
  ownProfile: boolean;
  isFollowing: boolean;
  email?: string;
}

export interface EditProfileDataTypes {
  _id: string;
  createdAt: string;
  fullName: string;
  profilePic: string;
  username: string;
  followers: number;
  following: number;
  ownProfile: boolean;
  isFollowing: boolean;
}

export interface userList {
  _id: string;
  fullName: string;
  username: string;
  profilePic: string;
  role: Role;
  isFollowing: boolean;
}

export interface getUserListTypes {
  data: userList[];
  page: number;
  results: number;
}

export interface FollowFollowersTypes {
  _id: string;
  fullName: string;
  username: string;
  profilePic: string;
  isFollowing: boolean;
  isAFollower: boolean;
  role: Role;
}
export interface FollowFollowingList {
  followers: FollowFollowersTypes[];
  following: FollowFollowersTypes[];
}
