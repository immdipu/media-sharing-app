"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import { useSocket } from "@/context/SocketProvider";
import { useToast } from "../ui/use-toast";
import { MainMenu } from "@excalidraw/excalidraw";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";
import { IAddActivity, IRemoveActivity } from "@/types/socketTypes";
import { useAppSelector } from "@/hooks/reduxHooks";
import { ActivityType, IGetActivityTypes } from "@/types/roomActivity";

const OtherUserExcalidraw = () => {
  const {
    isSharing,
    media,
    setIsSharing,
    ExternalShared,
    setExternalShared,
    OtherSelectedChanged,
  } = useContext(RoomContext);
  const previousElementsRef = useRef<any>();
  const { socket, AddActivity, EmitCustomEvent, RoomUpdate } = useSocket();
  const [ExcaliData, setExcaliData] = useState<any>("");
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const user = useAppSelector((state) => state.auth);
  const { toast } = useToast();
  const isMySharedDrawing = JoinedRoom?.roomActivity.find(
    (activity) => activity.admin._id === user?.id,
  );

  useEffect(() => {
    if (!setExternalShared) return;
    import("@excalidraw/excalidraw").then((comp) =>
      setExternalShared(comp.Excalidraw),
    );
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("excalidraw");

    if (data && ExternalShared && excalidrawAPI) {
      // setExcaliData(JSON.parse(data));
      // excalidrawAPI?.updateScene(JSON.parse(data));
      excalidrawAPI?.updateScene(JSON.parse(data));
    }
  }, [OtherSelectedChanged, ExternalShared, excalidrawAPI]);

  return (
    <>
      {ExternalShared && (
        <ExternalShared
          excalidrawAPI={(api: any) => {
            setExcalidrawAPI(api);
          }}
        >
          <MainMenu>
            <MainMenu.DefaultItems.Export />
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.ToggleTheme />
            <MainMenu.DefaultItems.Help />
            <MainMenu.DefaultItems.LoadScene />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
          </MainMenu>
        </ExternalShared>
      )}
    </>
  );
};

export default OtherUserExcalidraw;
