import React from "react";
import SingleMessage from "@/components/Message/SingleMessage";
import MessageInput from "../../../Message/MessageInput";
import RoomLeaveNotificationCard from "@/components/card/RoomLeaveNotificationCard";
import RoomJoinNotificationCard from "@/components/card/RoomJoinNotificationCard";
import { useAppSelector } from "@/hooks/reduxHooks";

const Chat = () => {
  const Messages = useAppSelector((state) => state.room.RoomChat);

  return (
    <div className="flex h-full flex-col justify-end pb-1">
      <section className="MessageContainer h-full overflow-y-auto ">
        {Messages &&
          Messages.length > 0 &&
          Messages?.map((message, index) => {
            if (message.Type === "JoinLeaveNotification") {
              if (message.status === "joined")
                return <RoomJoinNotificationCard key={index} {...message} />;
              if (message.status === "left")
                return <RoomLeaveNotificationCard key={index} {...message} />;
            }
            return <SingleMessage key={index} {...message} />;
          })}
      </section>
      <section className="h-14   ">
        <MessageInput />
      </section>
    </div>
  );
};

export default Chat;
