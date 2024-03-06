"use client";
/* eslint-disable @next/next/no-img-element */

import React, { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { LeaveRoom } from "@/redux/slice/roomSlice";
import { AddNewMessage } from "@/redux/slice/chatSlice";
import { AddNewRoom, StopRoomJoiningLoader } from "@/redux/slice/roomSlice";
import { useParams, usePathname } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface SocketContextProps {
  socket: Socket | null;
  isOnline: boolean;
  EmitCustomEvent: (event: string, data: any) => void;
  ListenCustomEvent: (event: string, callback: (data: any) => void) => void;
  CloseCustomEvent: (event: string, callback: (data: any) => void) => void;
  AddActivity: (data: IAddActivity) => void;
  RoomUpdate: (data: ActivityTypes) => void;
}

const SocketContext = createContext<SocketContextProps>({
  socket: null,
  isOnline: false,
  EmitCustomEvent: () => {},
  ListenCustomEvent: () => {},
  CloseCustomEvent: () => {},
  AddActivity: () => {},
  RoomUpdate: () => {},
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((state) => state.auth);
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const [socket, setSocket] = useState<Socket | null>(null);
  const pathanme = usePathname();
  const URLParams = useParams();
  const dispatch = useAppDispatch();
  const [isOnline, setIsOnline] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!user.isUserAuthenticated) return;

    const newSocket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);

    function onConnect() {
      setIsOnline(true);
    }

    function onDisconnect() {
      setIsOnline(false);
    }

    newSocket.emit("login", user);
    newSocket.on("connect", onConnect);
    newSocket.on("disconnect", onDisconnect);
    newSocket.on("error", (err) => {
      console.log("Socket Error", err); //
      dispatch(StopRoomJoiningLoader());
      toast({
        title: "Socket Error",
        description: err,
        variant: "destructive",
      });
    });
    newSocket.on("connect_error", (err) => {
      console.log(err.message); //
    });

    newSocket.on("room-created", (data: RoomTypes) => {
      dispatch(AddNewRoom(data));
    });

    // Set the socket instance in state
    setSocket(newSocket);

    // Disconnect the socket when the component unmounts
    return () => {
      newSocket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isUserAuthenticated]);

  useEffect(() => {
    if (!socket) return;
    if (JoinedRoom?.id) {
      if (!pathanme.includes("room")) {
        socket.emit("leave-room", {
          roomId: JoinedRoom.id,
          userId: user.id,
        });
        dispatch(LeaveRoom());
      }
    }

    socket.on("update-message-in-chat", (data: updateMessageDataTypes) => {
      if (data.type === updateMessageTypes.UPDATE_SENT_MESSAGE) {
        if (pathanme.includes("chat") && data.message.chatId === URLParams.id) {
          dispatch(AddNewMessage(data.message));
        }
      }
    });

    return () => {
      if (socket) {
        socket.off("update-message-in-chat");
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathanme, URLParams.id, socket]);

  const EmitCustomEvent = (event: string, data: any) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  const ListenCustomEvent = (event: string, callback: (data: any) => void) => {
    if (socket) {
      socket.on(event, callback);
    }
  };

  const CloseCustomEvent = (event: string, callback: (data: any) => void) => {
    if (socket) {
      socket.off(event, callback);
    }
  };

  const AddActivity = (data: IAddActivity) => {
    if (socket) {
      socket.emit("add-activity", data);
    }
  };

  const RoomUpdate = (data: ActivityTypes) => {
    if (socket) {
      socket.emit("room-update", data);
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        isOnline,
        EmitCustomEvent,
        ListenCustomEvent,
        CloseCustomEvent,
        AddActivity,
        RoomUpdate,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return React.useContext(SocketContext);
};
