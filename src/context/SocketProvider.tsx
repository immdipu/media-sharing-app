/* eslint-disable @next/next/no-img-element */
import React, { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";

import { usePathname } from "next/navigation";

interface SocketContextProps {
  socket: Socket | null;
  isOnline: boolean;
  EmitCustomEvent: (event: string, data: any) => void;
  ListenCustomEvent: (event: string, callback: (data: any) => void) => void;
  CloseCustomEvent: (event: string, callback: (data: any) => void) => void;
}

const SocketContext = createContext<SocketContextProps>({
  socket: null,
  isOnline: false,
  EmitCustomEvent: () => {},
  ListenCustomEvent: () => {},
  CloseCustomEvent: () => {},
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((state) => state.auth);
  const [socket, setSocket] = useState<Socket | null>(null);
  const pathanme = usePathname();
  const [isOnline, setIsOnline] = useState(false);
  const dispatch = useAppDispatch();

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

    newSocket.on("connect_error", (err) => {
      console.log(err.message); //
    });

    // Set the socket instance in state
    setSocket(newSocket);

    // Disconnect the socket when the component unmounts
    return () => {
      newSocket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isUserAuthenticated]);

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

  return (
    <SocketContext.Provider
      value={{
        socket,
        isOnline,
        EmitCustomEvent,
        ListenCustomEvent,
        CloseCustomEvent,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return React.useContext(SocketContext);
};
