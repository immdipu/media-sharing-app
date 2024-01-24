/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useLayoutEffect } from "react";
import { BsCalendar2Week } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { getUserDataTypes } from "@/types/userTypes";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dynamic from "next/dynamic";
import useFollow from "@/hooks/useFollow";
import useFollowStatus from "@/hooks/useFollowStatus";

const MessageButton = dynamic(
  () => import("@/components/profile/MessageButton"),
);

const FollowersFollowingTab = dynamic(
  () => import("@/components/FollowersFollowingTabList/FollowerFollowingTab"),
);

const ProfileCard: React.FC<getUserDataTypes> = ({
  _id,
  createdAt,
  followers,
  following,
  fullName,
  isFollowing: isfollowing,
  isAFollower,
  ownProfile,
  profilePic,
  username,
  email,
}) => {
  const { handleFollow, isFollowing, setIsFollowing } = useFollow();
  const { status } = useFollowStatus({ isFollowing, isAFollower });
  const [showFullImage, setShowFullImage] = React.useState<boolean>(false);

  useLayoutEffect(() => {
    if (isfollowing) {
      setIsFollowing(isfollowing);
    }
  }, [isfollowing]);

  //   const createAccessChat = useMutation(
  //     (id: string) => userApis.createAccessChat(id),
  //     {
  //       onSuccess: (data) => {
  //         router.push(`/chat?id=${data._id}&type=personal`);
  //       },
  //       onError: (data) => {
  //         toast.error("Failed to create access chat Try Again!");
  //       },
  //     },
  //   );

  //   const handleStartMessage = () => {
  //     createAccessChat.mutate(_id);
  //   };

  if (profilePic.includes("s96-c")) {
    profilePic = profilePic.replace("s96-c", "s300-c");
  }

  const HanldeshowFullImage = () => {
    setShowFullImage(!showFullImage);
  };

  return (
    <>
      <div className="mx-11 flex rounded-t-lg border-b border-b-secondary-color border-opacity-20 bg-Secondary-background py-7 pl-5 max-md:mx-4  max-md:flex-col">
        <div className="h-48 w-48  rounded-md" onClick={HanldeshowFullImage}>
          {showFullImage && (
            <div className="fixed inset-0 z-50 bg-neutral-500 bg-opacity-40 px-3 py-2 backdrop-blur-sm">
              <p className="absolute right-0 top-0 mr-3 mt-2 cursor-pointer rounded-md bg-neutral-900 px-2 py-1 hover:bg-neutral-600">
                Close
              </p>
              <img
                src={profilePic}
                alt="profilePic"
                className="h-full w-full object-contain"
              />
            </div>
          )}

          <Avatar className="h-44 w-44 rounded-md">
            <AvatarImage src={profilePic} />
            <AvatarFallback>{username}</AvatarFallback>
          </Avatar>
        </div>
        <div className=" w-full pl-7 max-md:mt-2 max-md:pl-0">
          <div className=" flex w-full justify-between">
            <h4 className="flex items-center pb-0 text-xl font-semibold text-Header-secondary">
              {fullName}{" "}
            </h4>
            <div className="flex items-center gap-3">
              <MessageButton _id={_id} />
              {!ownProfile && (
                <>
                  <button
                    onClick={() => {
                      setIsFollowing(!isFollowing);
                      handleFollow(_id, "getUser");
                    }}
                    className=" mr-14 flex items-center rounded-full border border-secondary-color px-4 py-2 text-sm leading-none text-Paragraph-primary  transition-colors duration-200 ease-linear hover:bg-secondary-hover"
                  >
                    {status}
                  </button>
                </>
              )}
            </div>
          </div>
          <p className=" mb-2 pb-2 ">
            <span className="mt-1 text-sm font-light tracking-wide text-paragraph-secondary">
              @{username}
            </span>
          </p>
          <section>
            <p className="mb-3 flex items-center">
              <BsCalendar2Week className="mr-3 text-neutral-300" />
              <span className="text-sm font-normal tracking-wide text-Paragraph-primary">
                Joined:
              </span>

              <span className="ml-2 text-xs font-normal text-paragraph-secondary ">
                {moment(createdAt).format("Y MMM DD")}
              </span>
              {/* {role === Role.admin ? (
                <span className="text-_light_white ml-2  text-sm font-normal ">
                  {moment(createdAt).format("Y MMM DD")}
                </span>
              ) : (
                <span className="text-_light_white ml-2  text-sm font-normal ">
                  {moment(createdAt).format("Y MMMM")}
                </span>
              )} */}
            </p>
            {ownProfile && (
              <p className="mb-2 flex -translate-x-[2px] items-center">
                <HiMail className="mr-3 text-xl text-neutral-300 " />
                <span className="text-sm font-normal tracking-wide text-neutral-300">
                  Email:
                </span>
                <span className="ml-2 text-sm text-paragraph-secondary">
                  {email}
                </span>
              </p>
            )}

            <div className="mb-2 mt-4 flex translate-x-[4px] items-center  gap-8">
              <FollowersFollowingTab
                followers={followers}
                following={following}
                _id={_id}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
