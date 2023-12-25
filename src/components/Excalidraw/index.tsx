"use client";
import React, {
  useState,
  useEffect,
  ComponentType,
  useRef,
  useContext,
} from "react";
import { useSocket } from "@/context/SocketProvider";
import {
  AppState,
  ExcalidrawImperativeAPI,
  ExcalidrawProps,
} from "@excalidraw/excalidraw/types/types";
import { useToast } from "../ui/use-toast";
import { LiveCollaborationTrigger, MainMenu } from "@excalidraw/excalidraw";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";
import { IAddActivity, IRemoveActivity } from "@/types/socketTypes";
import { useAppSelector } from "@/hooks/reduxHooks";
import { ActivityType, IGetActivityTypes } from "@/types/roomActivity";

const Excalidraws = () => {
  const [Excalidraw, setExcalidraw] =
    useState<ComponentType<ExcalidrawProps> | null>(null);
  const { isSharing, media, setIsSharing } = useContext(RoomContext);
  const previousElementsRef = useRef<any>();
  const { socket, AddActivity, EmitCustomEvent, RoomUpdate } = useSocket();
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const user = useAppSelector((state) => state.auth);
  const { toast } = useToast();
  const isMySharedDrawing = JoinedRoom?.roomActivity.find(
    (activity) => activity.admin._id === user?.id,
  );

  useEffect(() => {
    import("@excalidraw/excalidraw").then((comp) =>
      setExcalidraw(comp.Excalidraw),
    );
  }, []);

  useEffect(() => {
    if (!socket) return;
    if (!!!isMySharedDrawing) return;
    if (!Excalidraw) return;
    if (media === "YouTube") return;

    const listner = () => {
      let ActiivtyDetails: IGetActivityTypes = {
        activityId: isMySharedDrawing?.id,
        ActivityType: ActivityType.Drawing,
        data: {
          elements: previousElementsRef.current,
        },
      };

      EmitCustomEvent("Get_Activity_Details", ActiivtyDetails);
    };

    socket.on("GET_MEDIA_DETAILS", listner);
    return () => {
      socket?.off("GET_MEDIA_DETAILS", listner);
    };
  }, [Excalidraw, !!isMySharedDrawing, media]);

  const handleShare = () => {
    console.log("isSharing :", isSharing);
    if (!Excalidraw || !JoinedRoom || !user.id) return;
    if (isSharing) {
      let activity = JoinedRoom?.roomActivity.find(
        (item) => item.admin._id === user?.id,
      );
      if (!activity || !JoinedRoom || !user) {
        toast({
          title: "Something went wrong",
          variant: "destructive",
        });
        return;
      }
      // stop sharing
      setIsSharing(false);
      let RemoveActivity: IRemoveActivity = {
        type: "REMOVE_ACTIVITY",
        activityId: activity.id,
        roomId: JoinedRoom.id,
        userId: user.id!,
        adminId: activity.admin._id,
      };
      console.log("RemoveActivity :", RemoveActivity);
      RoomUpdate(RemoveActivity);
    } else {
      setIsSharing(true);
      const NewActivityData: IAddActivity = {
        type: ActivityType.Drawing,
        room: JoinedRoom?.id,
        admin: user.id,
        data: {
          elements: previousElementsRef.current,
        },
      };
      AddActivity(NewActivityData);
    }
  };

  return (
    <div className="w-full">
      <section className="h-[80vh]">
        {Excalidraw && (
          <Excalidraw
            initialData={{
              elements: [
                {
                  id: "-QJ8CKH_0INbXTIjTW9Vi",
                  type: "arrow",
                  x: 144.80001831054688,
                  y: 171.40000915527344,
                  width: 261.6000061035156,
                  height: 201.59999084472656,
                  angle: 0,
                  strokeColor: "#1e1e1e",
                  backgroundColor: "transparent",
                  fillStyle: "solid",
                  strokeWidth: 2,
                  strokeStyle: "solid",
                  roughness: 1,
                  opacity: 100,
                  groupIds: [],
                  frameId: null,
                  roundness: {
                    type: 2,
                  },
                  seed: 381145519,
                  version: 25,
                  versionNonce: 1216108001,
                  isDeleted: false,
                  boundElements: null,
                  updated: 1703069051871,
                  link: null,
                  locked: false,
                  points: [
                    [0, 0],
                    [261.6000061035156, 201.59999084472656],
                  ],
                  lastCommittedPoint: null,
                  startBinding: null,
                  endBinding: null,
                  startArrowhead: null,
                  endArrowhead: "arrow",
                },
                {
                  id: "3af0JhSAXiRK9i8PtuUC1",
                  type: "diamond",
                  x: 211.20001220703125,
                  y: 167.40000915527344,
                  width: 321.5999755859375,
                  height: 378.3999786376953,
                  angle: 0,
                  strokeColor: "#1e1e1e",
                  backgroundColor: "transparent",
                  fillStyle: "solid",
                  strokeWidth: 2,
                  strokeStyle: "solid",
                  roughness: 1,
                  opacity: 100,
                  groupIds: [],
                  frameId: null,
                  roundness: {
                    type: 2,
                  },
                  seed: 1625974593,
                  version: 108,
                  versionNonce: 36259297,
                  isDeleted: false,
                  boundElements: null,
                  updated: 1703069064671,
                  link: null,
                  locked: false,
                },
              ],
            }}
            onChange={(excalidrawElements, appState, files) => {
              if (
                JSON.stringify(previousElementsRef.current) !==
                JSON.stringify(excalidrawElements)
              ) {
                previousElementsRef.current = excalidrawElements;
                console.log("Elements :", excalidrawElements);
              }
            }}
            renderTopRightUI={() => (
              <button
                onClick={handleShare}
                className="flex w-full items-center justify-center rounded-md border bg-neutral-200 px-2"
              >
                {isSharing ? <>Sharing</> : <>share</>}
              </button>
            )}
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
          </Excalidraw>
        )}
      </section>
      <section className="h-full w-full"></section>
    </div>
  );
};

export default Excalidraws;
