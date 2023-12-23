"use client";
/* eslint-disable @next/next/no-img-element */

import React, { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { AddNewRoom, StopRoomJoiningLoader } from "@/redux/slice/roomSlice";
import { usePathname } from "next/navigation";
import { RoomTypes } from "@/types/room";
import { useToast } from "@/components/ui/use-toast";
import { IAddActivity, IRemoveActivity } from "@/types/socketTypes";

interface SocketContextProps {
  socket: Socket | null;
  isOnline: boolean;
  EmitCustomEvent: (event: string, data: any) => void;
  ListenCustomEvent: (event: string, callback: (data: any) => void) => void;
  CloseCustomEvent: (event: string, callback: (data: any) => void) => void;
  AddActivity: (data: IAddActivity) => void;
  RoomUpdate: (data: IRemoveActivity) => void;
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
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathanme]);

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

  const RoomUpdate = (data: IRemoveActivity) => {
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
