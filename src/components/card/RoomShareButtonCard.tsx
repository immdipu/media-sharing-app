/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { roomActivityTypes } from "@/types/roomActivity";
import clsx from "clsx";
import { useAppSelector, useSocket } from "@/hooks";
import { ActivityTypes } from "@/types/room";
import { useContext } from "react";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";
import { ActivityType as IActivityTypes } from "@/types/roomActivity";

const RoomShareButtonCard: React.FC<roomActivityTypes> = ({
  ActivityType,
  id,
  admin,
  createdAt,
  data,
  status,
  users,
}) => {
  const user = useAppSelector((state) => state.auth);

  const { socket, EmitCustomEvent } = useSocket();
  const JoinedRoom = useAppSelector((state) => state.room);
  const GET_MEDIA_DETAILS_RESPONSERef = useRef<any>(null);
  const {
    OtherYouTubePlayer,
    OtherExcalidraw,
    setMedia,
    setOtherSelectedChanged,
    setOtherMedia,
    othermedia,
  } = useContext(RoomContext);

  const isWatching = users?.find((u) => u._id == user?.id);
  const isMySharedActivity = admin._id === user?.id;

  useEffect(() => {
    if (
      isWatching &&
      (!isMySharedActivity || isMySharedActivity === undefined)
    ) {
      if (socket) {
        socket.on("Activity-state-sync", (data: any) => {
          if (ActivityType === IActivityTypes.YouTube) {
            if (data?.data?.time) {
              const timeDifference = Math.abs(
                data?.data?.time - OtherYouTubePlayer.current?.getCurrentTime(),
              );

              if (timeDifference > 4) {
                OtherYouTubePlayer.current?.seekTo(data?.data?.time);
              }
              if (
                data?.data?.VideoId !==
                OtherYouTubePlayer.current?.getVideoData()?.video_id
              ) {
                OtherYouTubePlayer.current?.loadVideoById(data?.data?.VideoId);
              }
            }
            if (data?.data?.state) {
              const playerState = OtherYouTubePlayer.current?.getPlayerState();
              if (playerState !== data?.data?.state) {
                if (data?.data?.state === 1) {
                  OtherYouTubePlayer.current?.playVideo();
                }
                if (data?.data?.state === 2) {
                  OtherYouTubePlayer.current?.pauseVideo();
                }
              }
            }
            if (
              data?.data?.VideoId !==
              OtherYouTubePlayer.current?.getVideoData()?.video_id
            ) {
              OtherYouTubePlayer.current?.loadVideoById(data?.data?.VideoId);
            }
          }
          if (ActivityType === IActivityTypes.Drawing) {
            if (data?.data?.elements) {
              localStorage.setItem("excalidraw", JSON.stringify(data?.data));
              if (OtherExcalidraw.current) {
                setOtherSelectedChanged((prev) => !prev);
              }
            }
          }
        });

        socket.on("GET_MEDIA_DETAILS_RESPONSE", async (data) => {
          if (ActivityType === IActivityTypes.YouTube) {
            if (!OtherYouTubePlayer.current) {
              GET_MEDIA_DETAILS_RESPONSERef.current = data;
              return;
            }

            if (data?.data?.VideoId) {
              OtherYouTubePlayer.current?.loadVideoById({
                videoId: data?.data?.VideoId,
                startSeconds: data?.data?.time || 0,
              });
            }
            if (data?.data?.state) {
              if (data?.data?.state === 1) {
                OtherYouTubePlayer.current?.playVideo();
              } else {
                OtherYouTubePlayer.current?.pauseVideo();
              }
            }
          }
          if (ActivityType === IActivityTypes.Drawing) {
            if (!OtherExcalidraw.current) {
              GET_MEDIA_DETAILS_RESPONSERef.current = data;
              return;
            }
            localStorage.setItem("excalidraw", JSON.stringify(data?.data));
            if (OtherExcalidraw.current) {
              setOtherSelectedChanged((prev) => !prev);
            }
          }
        });
      }
      return () => {
        socket?.off("Activity-state-sync");
        socket?.off("GET_MEDIA_DETAILS_RESPONSE");
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWatching, OtherExcalidraw, OtherYouTubePlayer]);

  useEffect(() => {
    if (
      OtherYouTubePlayer.current &&
      OtherExcalidraw.current &&
      GET_MEDIA_DETAILS_RESPONSERef.current
    ) {
      const data = GET_MEDIA_DETAILS_RESPONSERef.current;
      new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
        if (ActivityType === IActivityTypes.YouTube) {
          if (data?.data?.VideoId) {
            OtherYouTubePlayer.current?.loadVideoById({
              videoId: data?.data?.VideoId,
              startSeconds: data?.data?.time || 0,
            });
          }
          if (data?.data?.state) {
            if (data?.data?.state === 1) {
              OtherYouTubePlayer.current?.playVideo();
            } else {
              OtherYouTubePlayer.current?.pauseVideo();
            }
          }
        }

        if (ActivityType === IActivityTypes.Drawing) {
          localStorage.setItem("excalidraw", JSON.stringify(data?.data));
          if (OtherExcalidraw.current) {
            setOtherSelectedChanged((prev) => !prev);
          }
        }

        GET_MEDIA_DETAILS_RESPONSERef.current = null;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [OtherExcalidraw, OtherYouTubePlayer]);

  const handleJoinAndLeave = () => {
    if (isWatching) {
      // setOthersSelected(false);
      setOtherMedia(null);
      let data: ActivityTypes = {
        type: "REMOVE_MEMBER_FROM_ACTIVITY",
        roomId: JoinedRoom.JoinedRoom?.id!,
        userId: user?.id!,
        activityId: id!,
        adminId: admin._id,
      };
      EmitCustomEvent("room-update", data);
    } else {
      if (isMySharedActivity) {
        // setOthersSelected(true);
        setMedia(ActivityType);
        setOtherMedia(null);
      } else {
        // setOthersSelected(false);
        setOtherMedia(ActivityType);
      }

      let data: ActivityTypes = {
        type: "ADD_MEMBER_FROM_ACTIVITY",
        roomId: JoinedRoom.JoinedRoom?.id!,
        userId: user?.id!,
        activityId: id!,
        adminId: admin._id,
      };
      EmitCustomEvent("room-update", data);
    }
  };

  return (
    <div className="w-16">
      <section className="flex">
        {users?.map((user, key) => (
          <Avatar className="h-4 w-4 rounded-full " key={key}>
            <AvatarImage src={user?.profilePic} alt="@shadcn" />
            <AvatarFallback>{user?.fullName}</AvatarFallback>
          </Avatar>
        ))}
      </section>
      <Avatar
        onClick={handleJoinAndLeave}
        className={clsx(
          "group mt-1 h-14 w-14 cursor-pointer rounded-md  ",
          isWatching ? " shadow-lg shadow-blue-500 ring-2 ring-blue-500" : "",
        )}
      >
        <AvatarImage src={admin?.profilePic} alt="@shadcn" className="" />
        <AvatarFallback>{admin?.fullName}</AvatarFallback>
        {data?.thumbnail && (
          <img
            className={clsx(
              "absolute h-full w-full object-cover opacity-0 transition-opacity duration-200 ease-linear group-hover:opacity-70",
            )}
            src={data?.thumbnail}
            alt=""
          />
        )}
      </Avatar>
    </div>
  );
};

export default RoomShareButtonCard;
