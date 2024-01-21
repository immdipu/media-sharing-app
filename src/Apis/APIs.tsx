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

  getUserChatList: async (): Promise<[]> => {
    const res = await axiosInstance().get(
      `${process.env.NEXT_PUBLIC_USER_URL}/chat/allchats`,
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
  createGroupChat: async (data: {
    name: string;
    numberOfUsersAllowed: number;
  }) => {
    const res = await axiosInstance().post(
      `${process.env.NEXT_PUBLIC_USER_URL}/chat/group`,
      data,
    );
    return res.data;
  },
  getAllGroupChats: async () => {
    const res = await axiosInstance().get(
      `${process.env.NEXT_PUBLIC_USER_URL}/chat/group`,
    );
    return res.data;
  },
  addToGroupChat: async (data: { chatId: string; userId: string }) => {
    const res = await axiosInstance().put(
      `${process.env.NEXT_PUBLIC_USER_URL}/chat/group`,
      data,
    );
    return res.data;
  },
  getGroupDetails: async (chatId: string) => {
    const res = await axiosInstance().post(
      `${process.env.NEXT_PUBLIC_USER_URL}/chat/group/details`,
      {
        chatId,
      },
    );
    return res.data;
  },
  removeFromGroupChat: async (data: { chatId: string; userId: string }) => {
    const res = await axiosInstance().delete(
      `${process.env.NEXT_PUBLIC_USER_URL}/chat/group`,
      {
        data,
      },
    );
    return res.data;
  },
  loginasUser: async (id: string) => {
    const res = await axiosInstance().get(
      `${process.env.NEXT_PUBLIC_USER_URL}/user/loginas/${id}`,
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
};
