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
    const res = await axiosInstance().get("/user/login");
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
  AddMedia: async (data: AddMediaDataTypes) => {
    const res = await axiosInstance().post(
      `${process.env.NEXT_PUBLIC_USER_URL}/media/addmedia`,
      data,
    );
    return res.data;
  },

  AddMediaToHistory: async (data: AddMediaDataTypes) => {
    const res = await axiosInstance().post(
      `${process.env.NEXT_PUBLIC_USER_URL}/media/history`,
      data,
    );
    return res.data;
  },
  GetAllMedia: async () => {
    const res = await axiosInstance().get(
      `${process.env.NEXT_PUBLIC_USER_URL}/media`,
    );
    return res.data;
  },
  RemoveMedia: async (id: string) => {
    const res = await axiosInstance().delete(
      `${process.env.NEXT_PUBLIC_USER_URL}/media/${id}`,
    );
    return res.data;
  },

  SendFeeback: async (data: feedbackDataTypes) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_URL}/media/feedback`,
      data,
    );
    return res.data;
  },
  GetNotification: async (): Promise<string[]> => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_USER_URL}/media/notification`,
    );
    return res.data;
  },

  AddNotification: async (data: any): Promise<string> => {
    const res = await axiosInstance().post(
      `${process.env.NEXT_PUBLIC_USER_URL}/media/notification`,
      data,
    );
    return res.data;
  },

  GetUserProfile: async (username: string): Promise<getUserDataTypes> => {
    const res = await axiosInstance().get(
      `${process.env.NEXT_PUBLIC_USER_URL}/user/${username}`,
    );
    return res.data;
  },
  FollowUser: async (id: string): Promise<string> => {
    const res = await axiosInstance().get(
      `${process.env.NEXT_PUBLIC_USER_URL}/user/follow/${id}`,
    );
    return res.data;
  },

  getFollowersFollowingList: async (
    id: string,
  ): Promise<FollowFollowingList> => {
    const res = await axiosInstance().get(
      `${process.env.NEXT_PUBLIC_USER_URL}/user/followers/${id}`,
    );
    return res.data;
  },

  EditProfile: async (
    data: EditProfileDataTypes,
  ): Promise<EditProfileDataTypes> => {
    const res = await axiosInstance().post(
      `${process.env.NEXT_PUBLIC_USER_URL}/user/editprofile`,
      data,
    );
    return res.data;
  },
  getUserList: async (
    currentPage: number,
    sort?: string,
  ): Promise<getUserListTypes> => {
    const res = await axiosInstance().get(
      `${process.env.NEXT_PUBLIC_USER_URL}/user?page=${currentPage}${
        sort ? `&sort=${sort}` : ""
      }`,
    );
    return res.data;
  },

  searchUser: async (search: string): Promise<userList[]> => {
    const res = await axiosInstance().get(
      `${process.env.NEXT_PUBLIC_USER_URL}/user/search/term?q=${search}`,
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
};
