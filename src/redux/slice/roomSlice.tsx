import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
  Room: RoomTypes[] | null;
  JoinedRoom: RoomTypes | null;
  RoomChat: RoomChatTypes[] | null;
  RoomJoiningLoader: boolean;
  StreamingLink: string | null;
  ReplyTo: RoomMessageTypes | null;
}

const initialState: initialStateProps = {
  Room: null,
  JoinedRoom: null,
  RoomChat: null,
  RoomJoiningLoader: false,
  StreamingLink: null,
  ReplyTo: null,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    AddNewRoom: (state, action: PayloadAction<RoomTypes>) => {
      if (state.Room) {
        state.Room.unshift(action.payload);
      } else {
        state.Room = [action.payload];
      }
    },

    AddAllRoom: (state, action: PayloadAction<RoomTypes[]>) => {
      state.Room = action.payload;
    },

    JoinRoom: (state, action: PayloadAction<RoomTypes>) => {
      state.JoinedRoom = action.payload;
      state.RoomChat = null;
    },

    LeaveRoom: (state) => {
      state.JoinedRoom = null;
      state.RoomChat = null;
    },

    AddMessage: (state, action: PayloadAction<RoomChatTypes>) => {
      if (state.RoomChat) {
        state.RoomChat.push(action.payload);
      } else {
        state.RoomChat = [action.payload];
      }
    },

    AddReplyMessage: (state, action: PayloadAction<MessageReplyTypes>) => {
      const originalMessage = state.RoomChat?.find(
        (message) =>
          (message.Type === "message" || message.Type === "reply") &&
          message._id === action.payload.replyTo,
      ) as unknown as RoomMessageTypes | MessageReplyTypes | null | undefined;

      if (!originalMessage) return;

      let replyMessage = {
        ...action.payload,
        replyTo: {
          _id: originalMessage._id,
          content: originalMessage.content,
          sender: originalMessage.sender,
          createdAt: originalMessage.createdAt,
        },
      };
      state.RoomChat?.push(replyMessage as MessageReplyTypes);
    },

    AddNewMemeberToTheRoom: (state, action: PayloadAction<membersTypes>) => {
      const user = action.payload;
      const userAlreadyExist = state.JoinedRoom?.members?.find(
        (member) => member._id === user._id,
      );
      if (!userAlreadyExist) {
        state.JoinedRoom?.members?.push(user);
      }
    },
    RemoveMemberFromRoom: (state, action: PayloadAction<membersTypes>) => {
      const user = action.payload;
      const userExist = state.JoinedRoom?.members.find(
        (member) => member._id === user._id,
      );
      if (state.JoinedRoom && userExist) {
        const RemoveUser = state.JoinedRoom?.members.filter(
          (memeber) => memeber._id !== user._id,
        );
        state.JoinedRoom.members = RemoveUser;
      }
    },

    UpdateRoom: (state, action: PayloadAction<RoomTypes>) => {
      if (state.JoinedRoom) {
        state.JoinedRoom = action.payload;
      }
    },

    UpdateAnActivity: (state, action: PayloadAction<roomActivityTypes>) => {
      if (state.JoinedRoom) {
        const activityIndex = state.JoinedRoom.roomActivity.findIndex(
          (activity) => activity.id === action.payload.id,
        );
        if (activityIndex !== -1) {
          state.JoinedRoom.roomActivity[activityIndex] = action.payload;
        }
      }
    },

    UpdateAllActivity: (state, action: PayloadAction<roomActivityTypes[]>) => {
      if (state.JoinedRoom) {
        state.JoinedRoom.roomActivity = action.payload;
      }
    },

    DeleteAnActivity: (
      state,
      action: PayloadAction<ActivityDeleteResponseTypes>,
    ) => {
      if (state.JoinedRoom) {
        let newActivities = state.JoinedRoom.roomActivity.filter(
          (activity) => activity.id !== action.payload.activityId,
        );
        state.JoinedRoom.roomActivity = newActivities;
      }
    },
    AddStreamingLink: (state, action: PayloadAction<string>) => {
      state.StreamingLink = action.payload;
    },

    UpdateMessageReaction: (
      state,
      action: PayloadAction<MessageReactionDataTypes>,
    ) => {
      const { sender, emoji, msgId, createdAt } = action.payload;
      if (!state.RoomChat) {
        return;
      }
      const senderDetails = state.JoinedRoom?.members.find(
        (member) => member._id === sender._id,
      );
      if (!senderDetails) {
        return;
      }

      const message = state.RoomChat.find(
        (message) =>
          (message.Type === "message" || message.Type === "reply") &&
          message._id === msgId,
      );
      if (message && (message.Type === "message" || message.Type === "reply")) {
        if (message.reactions.length > 0) {
          const ReactionExist = message.reactions.find(
            (reaction) => reaction.sender._id === sender._id,
          );
          if (ReactionExist && ReactionExist.emoji === emoji) {
            const newReactions = message.reactions.filter(
              (reaction) => reaction.sender._id !== sender._id,
            );
            message.reactions = newReactions;
            return;
          }
          if (ReactionExist && ReactionExist.emoji !== emoji) {
            const newReactions = message.reactions.filter(
              (reaction) => reaction.sender._id !== sender._id,
            );
            message.reactions = newReactions;
            message.reactions.push({
              createdAt,
              emoji,
              msgId,
              sender: {
                _id: senderDetails._id,
                fullName: senderDetails.fullName,
                profilePic: senderDetails.profilePic,
                username: senderDetails.username,
                verified: senderDetails.verified,
              },
            });
            return;
          }

          message.reactions.push({
            createdAt,
            emoji,
            msgId,
            sender: {
              _id: senderDetails._id,
              fullName: senderDetails.fullName,
              profilePic: senderDetails.profilePic,
              username: senderDetails.username,
              verified: senderDetails.verified,
            },
          });
        } else {
          message.reactions.push({
            createdAt,
            emoji,
            msgId,
            sender: {
              _id: senderDetails._id,
              fullName: senderDetails.fullName,
              profilePic: senderDetails.profilePic,
              username: senderDetails.username,
              verified: senderDetails.verified,
            },
          });
        }
      }
    },

    AddReplyTo: (state, action: PayloadAction<string>) => {
      const replyTo = state.RoomChat?.find(
        (message) =>
          (message.Type === "message" || message.Type === "reply") &&
          message._id === action.payload,
      );
      if (replyTo) {
        state.ReplyTo = replyTo as RoomMessageTypes;
      }
    },

    DeleteMessage: (state, action: PayloadAction<MessageDeleteTypes>) => {
      const { msgId, sender, Type } = action.payload;
      const message = state.RoomChat?.find(
        (msg) => msg?._id === msgId,
      ) as unknown as DefaultMessageTypes | null;
      if (message && message.content && message.sender._id === sender._id) {
        message.content = "This message has been deleted";
        message.deleted = true;
      }
    },

    AddJoinRequestMessage(state, action: PayloadAction<RoomJoinRequest>) {
      if (state.RoomChat) {
        // const removeOldRequest = state.RoomChat.filter(
        //   (message) =>
        //     message.Type === "RoomJoinRequest" &&
        //     message.sender._id !== action.payload.sender._id,
        // );
        // state.RoomChat = removeOldRequest;
        state.RoomChat.push(action.payload);
      } else {
        state.RoomChat = [action.payload];
      }
    },
    UpdateJoinRequest: (
      state,
      action: PayloadAction<{
        status: "accepted" | "rejected";
        _id: string;
      }>,
    ) => {
      const joinRequest = state.RoomChat?.find(
        (message) =>
          message.Type === "RoomJoinRequest" &&
          message._id === action.payload._id,
      ) as unknown as RoomJoinRequest | null;
      if (joinRequest) {
        joinRequest.status = action.payload.status;
      }
    },

    RemoveReplyTo: (state) => {
      state.ReplyTo = null;
    },

    StopRoomJoiningLoader: (state) => {
      state.RoomJoiningLoader = false;
    },
    StartRoomJoiningLoader: (state) => {
      state.RoomJoiningLoader = true;
    },
  },
});

export const {
  AddNewRoom,
  JoinRoom,
  LeaveRoom,
  AddAllRoom,
  AddMessage,
  AddNewMemeberToTheRoom,
  RemoveMemberFromRoom,
  StopRoomJoiningLoader,
  StartRoomJoiningLoader,
  UpdateRoom,
  UpdateAnActivity,
  DeleteAnActivity,
  UpdateAllActivity,
  AddStreamingLink,
  UpdateMessageReaction,
  AddReplyTo,
  RemoveReplyTo,
  AddReplyMessage,
  DeleteMessage,
  AddJoinRequestMessage,
  UpdateJoinRequest,
} = roomSlice.actions;
export default roomSlice.reducer;
