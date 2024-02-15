"use client";
import React, {
  useState,
  useEffect,
  ComponentType,
  useRef,
  useContext,
} from "react";
import { ExcalidrawProps } from "@excalidraw/excalidraw/types/types";
import { useToast } from "../ui/use-toast";
import { MainMenu } from "@excalidraw/excalidraw";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";
import { useAppSelector, useSocket, useUserRoomActivity } from "@/hooks";
import {
  ActivityType,
  IGetActivityTypes,
  IAddActivity,
  IRemoveActivity,
} from "@/types";
import clsx from "clsx";

const Excalidraws = () => {
  const [Excalidraw, setExcalidraw] =
    useState<ComponentType<ExcalidrawProps> | null>(null);
  const { media, setIsSharing, OthersSelected } = useContext(RoomContext);
  const previousElementsRef = useRef<any>();
  const { socket, AddActivity, EmitCustomEvent, RoomUpdate } = useSocket();
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const user = useAppSelector((state) => state.auth);
  const { isMySharedActivity, userJoinedActivity } = useUserRoomActivity();
  const { toast } = useToast();
  const isMySharedDrawing = JoinedRoom?.roomActivity.find(
    (activity) => activity.admin._id === user?.id,
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
    if (!!isMySharedActivity) {
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

      let RemoveActivity: IRemoveActivity = {
        type: "REMOVE_ACTIVITY",
        activityId: activity.id,
        roomId: JoinedRoom.id,
        userId: user.id!,
        adminId: activity.admin._id,
      };

      RoomUpdate(RemoveActivity);
    } else {
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
        <div className={clsx("h-full")}>
          {Excalidraw && (
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
                if (!!!isMySharedActivity) return;
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
                  {!!isMySharedActivity ? <>Sharing</> : <>share</>}
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
        </div>
      </section>
      <section className="h-full w-full"></section>
    </div>
  );
};

export default Excalidraws;
