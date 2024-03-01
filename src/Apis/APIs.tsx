import { axiosInstance } from "@/lib/AxiosInstace";
import axios from "axios";
import {
  signupParamsTypes,
  AddMediaDataTypes,
  getUserDataTypes,
  feedbackDataTypes,
  EditProfileDataTypes,
  getUserListTypes,
  FollowFollowingList,
  userList,
  loginResponseTypes,
} from "@/types/userTypes";
import { RoomTypes } from "@/types/room";
import { YouTubeVideo } from "@/types/Youtube";
import {
  GetAllChatsTypes,
  GetAllFollowersTypes,
  SingleGetChatTypes,
} from "@/types/ApiResponseTypes";

export const userApis = {
  GoogleLogin: async (token: string) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/googlelogin`,
      {
        token,
      },
    );
    return res.data;
  },
  AutoLogin: async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/autologin`,
      {
        token: localStorage.getItem("token"),
      },
    );
    return res.data;
  },
  LogIn: async (email: string) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/login`,
      {
        email,
      },
    );
    return res.data;
  },

  verfiyEmail: async (data: {
    email: string;
    code: number;
  }): Promise<loginResponseTypes> => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/verifyCode`,
      data,
    );
    return res.data;
  },

  sendVerificationCode: async (email: string) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/sendverification`,
      {
        email,
      },
    );
    return res.data;
  },

  getAllRooms: async (): Promise<RoomTypes[]> => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/room/allrooms`,
    );
    return res.data;
  },

  sendFeedback: async (data: feedbackDataTypes) => {
    const res = await axiosInstance().post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/feedback`,
      data,
    );
    return res.data;
  },

  GetUserProfile: async (username: string): Promise<getUserDataTypes> => {
    const res = await axiosInstance().get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/${username}`,
    );
    return res.data;
  },

  EditProfile: async (
    data: EditProfileDataTypes,
  ): Promise<EditProfileDataTypes> => {
    const res = await axiosInstance().post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/editprofile`,
      data,
    );
    return res.data;
  },
  AddRemoveFollowers: async (userId: string): Promise<any> => {
    const res = await axiosInstance().post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/follow`,
      {
        userId,
      },
    );
    return res.data;
  },

  getCreateSingleChat: async (userId: string): Promise<any> => {
    const res = await axiosInstance().post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/chat/`,
      {
        otherUserId: userId,
      },
    );
    return res.data;
  },

  getAllFollowers: async (userId: string): Promise<GetAllFollowersTypes> => {
    const res = await axiosInstance().get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/followers/${userId}`,
    );
    return res.data;
  },
  getAllFollowing: async (userId: string): Promise<GetAllFollowersTypes> => {
    const res = await axiosInstance().get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/following/${userId}`,
    );
    return res.data;
  },

  getSingleChatByuserId: async (userId: string): Promise<any> => {
    const res = await axiosInstance().post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/chat`,
      {
        otherUserId: userId,
      },
    );
    return res.data;
  },

  getSingleChatByChatId: async (
    chatId: string,
  ): Promise<SingleGetChatTypes> => {
    const res = await axiosInstance().get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/chat/one-chat/${chatId}`,
    );
    return res.data;
  },

  getUserChatList: async (): Promise<GetAllChatsTypes> => {
    const res = await axiosInstance().get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/chat/all-chats`,
    );
    return res.data;
  },

  sendMessage: async (data: { content: string; chatId: string }) => {
    const res = await axiosInstance().post(
      `${process.env.NEXT_PUBLIC_USER_URL}/message`,
      data,
    );
    return res.data;
  },

  getallMessages: async (chatId: string) => {
    const res = await axiosInstance().get(
      `${process.env.NEXT_PUBLIC_USER_URL}/message/${chatId}`,
    );
    return res.data;
  },
  createAccessChat: async (id: string) => {
    const res = await axiosInstance().post(
      `${process.env.NEXT_PUBLIC_USER_URL}/chat`,
      {
        userId: id,
      },
    );
    return res.data;
  },

  getYoutubeSuggeston: async (searchTerm: string) => {
    const res = await axiosInstance().post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/media/youtube/suggestions`,
      {
        searchTerm,
      },
    );
    return res.data;
  },

  getYouTubeVideos: async (searchTerm: string): Promise<YouTubeVideo[]> => {
    const res = await axiosInstance().post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/media/youtube/videos`,
      {
        searchTerm,
      },
    );
    return res.data;
  },

  getTrendingVideos: async (): Promise<YouTubeVideo[]> => {
    const res = await axiosInstance().get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/media/youtube/trending`,
    );
    return res.data;
  },
  getHomePageVideos: async (): Promise<YouTubeVideo[]> => {
    const res = await axiosInstance().get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/media/youtube/home`,
    );
    return res.data;
  },
  getRelatedVideos: async (videoId: string): Promise<YouTubeVideo[]> => {
    const res = await axiosInstance().get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/media/youtube/related/${videoId}`,
    );
    return res.data;
  },
};
