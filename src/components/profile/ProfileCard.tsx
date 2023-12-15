/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";
import { BsCalendar2Week } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { BiMoviePlay } from "react-icons/bi";
import { getUserDataTypes } from "@/types/userTypes";
import { Role } from "@/types/role";
import moment from "moment";
import { userApis } from "@/Apis/APIs";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { AiOutlineMessage } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/hooks/reduxHooks";

interface ProfileCardProps extends getUserDataTypes {
  role: Role;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  _id,
  createdAt,
  email_verified,
  followers,
  following,
  fullName,
  genre,
  isFollowing,
  ownProfile,
  profilePic,
  username,
  email,
  role,
}) => {
  const [follow, setFollow] = React.useState<boolean>(isFollowing);
  const user = useAppSelector((state) => state.auth);
  const queryClient = useQueryClient();
  const router = useRouter();
  const [showFullImage, setShowFullImage] = React.useState<boolean>(false);
  //   const updateFollow = useMutation((id: string) => userApis.FollowUser(id), {
  //     onSuccess: (data) => {
  //       queryClient.invalidateQueries(["getUser"]);
  //     },
  //     onError: (data) => {
  //       toast.error("Failed to follow Try Again!");
  //     },
  //   });

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

  const Followers = (
    <div>
      <span className="text-sm font-semibold tracking-wide  text-neutral-300">
        {followers.length}
      </span>
      <span className="text-_light_white ml-2 text-sm font-normal">
        Followers
      </span>
    </div>
  );

  const Following = (
    <div>
      <span className="text-sm font-semibold tracking-wide text-neutral-300">
        {following.length}
      </span>
      <span className="text-_light_white ml-2 text-sm font-normal">
        {" "}
        Following
      </span>
    </div>
  );

  if (profilePic.includes("s96-c")) {
    profilePic = profilePic.replace("s96-c", "s300-c");
  }

  const HanldeshowFullImage = () => {
    setShowFullImage(!showFullImage);
  };

  return (
    <>
      <div className="border-b-_welcometext_lightblue mx-11 flex rounded-t-lg border-b border-opacity-20 bg-neutral-800 py-7 pl-5 max-md:mx-4  max-md:flex-col">
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
          {/* <Images
            src={profilePic}
            alt={username}
            height={200}
            width={200}
            ImageWidth={"full"}
            Imageheight={"full"}
            rounded="20px"
            objectFit="cover"
          /> */}
          <Avatar>
            <AvatarImage src={profilePic} />
            <AvatarFallback>{username}</AvatarFallback>
          </Avatar>
        </div>
        <div className="mt-4 w-full pl-7 max-md:mt-2 max-md:pl-0">
          <div className=" flex w-full justify-between">
            <h4 className="flex items-center pb-0 text-xl font-semibold">
              {fullName}{" "}
              <span
                className={clsx(
                  "ml-4 rounded-3xl px-2 py-px text-xs font-light ",
                  email_verified
                    ? "border border-green-500 text-green-400"
                    : "border border-red-300 text-red-300",
                )}
              >
                {email_verified ? "Verified" : "Not Verified"}
              </span>
            </h4>
            {/* <div className="flex items-center gap-3">
              {!ownProfile && (
                <>
                  <Tooltip
                    title={
                      createAccessChat.isLoading
                        ? "Loading Chat"
                        : "send message"
                    }
                  >
                    <IconButton onClick={handleStartMessage}>
                      {createAccessChat.isLoading ? (
                        <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-white"></div>
                      ) : (
                        <AiOutlineMessage className="text-2xl text-neutral-400" />
                      )}
                    </IconButton>
                  </Tooltip>

                  <button
                    onClick={() => {
                      updateFollow.mutate(_id);
                      setFollow(!follow);
                    }}
                    className="border-_light_white mr-14 flex items-center rounded-2xl border border-opacity-60 px-5 py-1 transition-colors duration-200 ease-linear hover:border-opacity-100"
                  >
                    {follow ? (
                      <span className="text-base font-normal  text-neutral-300 max-md:text-sm">
                        Following
                      </span>
                    ) : (
                      <span className="text-base font-normal text-neutral-300 max-md:text-sm">
                        Follow
                      </span>
                    )}
                  </button>
                </>
              )}
            </div> */}
          </div>
          <p className=" mb-2 -translate-y-2 pb-2 ">
            <span className="text-sm font-light tracking-wide text-neutral-400">
              @{username}
            </span>
          </p>
          <section>
            <p className="mb-3 flex items-center">
              <BsCalendar2Week className="mr-3 text-neutral-300" />
              <span className="text-sm font-normal tracking-wide text-neutral-300">
                Joined:
              </span>

              <span className="text-_light_white ml-2 text-sm font-normal ">
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
                <span className="text-_light_white ml-2 text-sm font-normal">
                  {email}
                </span>
              </p>
            )}
            <div className="mb-2 mt-3 flex -translate-x-[2px] items-center">
              <BiMoviePlay className="mr-3 text-xl text-neutral-300 " />
              <span className="text-sm font-normal tracking-wide text-neutral-300">
                Genre:
              </span>
              <div className="ml-2 flex flex-wrap gap-2 ">
                {genre.length > 0 ? (
                  genre.map((item, index) => (
                    <span
                      key={index}
                      className=" border-_welcometext_lightblue text-_light_white shrink-0 rounded-2xl border border-opacity-30 px-2 py-1  text-xs font-normal"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <span className=" p text-_light_white    text-xs font-normal">
                    Not Available
                  </span>
                )}
              </div>
            </div>
            <div className="mb-2 mt-4 flex translate-x-[4px] items-center  gap-8">
              <div>{Following}</div>
              <div>{followers}</div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
