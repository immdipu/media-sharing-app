"use client";
import React, {
  useState,
  useEffect,
  ComponentType,
  useRef,
  useContext,
} from "react";
import OtherUserExcalidraw from "./OtherUserExcalidraw";
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
  const {
    isSharing,
    media,
    setIsSharing,
    OthersSelected,
    setOthersSelected,
    OtherSelectedChanged,
  } = useContext(RoomContext);
  const previousElementsRef = useRef<any>();
  const { socket, AddActivity, EmitCustomEvent, RoomUpdate } = useSocket();
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const user = useAppSelector((state) => state.auth);
  const { toast } = useToast();
  const isMySharedDrawing = JoinedRoom?.roomActivity.find(
    (activity) => activity.admin._id === user?.id,
  );

  const AmWatchingthirdPartyDrawing = !!JoinedRoom?.roomActivity.find(
    (activity) => {
      return activity.users?.find(
        (u) => u._id === user?.id && activity.admin._id !== user?.id,
      );
    },
  );

  const AmIwatchingMyDrawing = isMySharedDrawing?.users?.find(
    (u) => u._id === user?.id,
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
        {Excalidraw && !OthersSelected && (
          <Excalidraw
            onChange={(excalidrawElements, appState, files) => {
              // if (
              //   JSON.stringify(previousElementsRef.current) !==
              //   JSON.stringify(excalidrawElements)
              // ) {
              //   previousElementsRef.current = excalidrawElements;
              //   EmitCustomEvent("Activity-state-server", {
              //     activityId: isMySharedDrawing?.id,
              //     data: {
              //       elements: excalidrawElements,
              //     },
              //   });
              // }
              previousElementsRef.current = excalidrawElements;
              if (!isSharing) return;
              EmitCustomEvent("Activity-state-server", {
                activityId: isMySharedDrawing?.id,
                data: {
                  elements: excalidrawElements,
                },
              });
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
        {OthersSelected && AmWatchingthirdPartyDrawing && (
          <OtherUserExcalidraw />
        )}
      </section>
      <section className="h-full w-full"></section>
    </div>
  );
};

export default Excalidraws;
