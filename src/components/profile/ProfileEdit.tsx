import React, { useState, useEffect } from "react";
import ProfileInput from "./InputComponent/ProfileInput";
import { getUserDataTypes, EditProfileDataTypes } from "@/types/userTypes";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApis } from "@/Apis/APIs";
import { useToast } from "@/components/ui/use-toast";
import { RotatingLines } from "react-loader-spinner";
const ProfileEdit: React.FC<getUserDataTypes> = ({
  _id,
  createdAt,
  followers,
  following,
  fullName,
  bio,
  isFollowing,
  ownProfile,
  profilePic,
  username,
  email,
  isAFollower,
}) => {
  const queryClient = useQueryClient(),
    [initialUser, setInitialUser] = useState<getUserDataTypes>({
      _id,
      createdAt,
      followers,
      following,
      fullName,
      isFollowing,
      ownProfile,
      profilePic,
      username,
      email,
      bio,
      isAFollower,
    }),
    [user, setuser] = useState<getUserDataTypes>({
      ...initialUser,
    }),
    [isEdit, setisEdit] = useState<boolean>(false),
    router = useRouter();
  const { toast } = useToast();

  function removeEmptyFields(obj: any) {
    const newobj = { ...obj };
    Object.keys(newobj).forEach((key) => {
      if (
        newobj[key] === undefined ||
        newobj[key] === null ||
        newobj[key] === ""
      ) {
        delete newobj[key];
      }
    });
    return newobj;
  }

  useEffect(() => {
    const cleanUser = removeEmptyFields(user);
    const cleanInitialUser = removeEmptyFields(initialUser);
    const hasChanged =
      JSON.stringify(cleanInitialUser) !== JSON.stringify(cleanUser);

    setisEdit(hasChanged);
  }, [user, initialUser]);

  const EditProfile = useMutation(
    (data: EditProfileDataTypes) => userApis.EditProfile(data),
    {
      onSuccess: (data) => {
        toast({
          title: "Success",
          description: "Profile updated successfully",
          variant: "default",
        });
        router.push(`/profile/${user.username}?tab=editprofile`, {
          scroll: false,
        });
        queryClient.invalidateQueries(["getUser", user.username]);
      },
      onError: (data: any) => {
        toast({
          title: "Error",
          description: data.response.data || "Failed to update profile",
          variant: "destructive",
        });
      },
    },
  );

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "username") {
      setuser({ ...user, [e.target.name]: e.target.value.trim() });
    }
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  function isUsernameValid(username: string): boolean {
    const pattern = /^[a-zA-Z0-9]+$/;
    return pattern.test(username);
  }

  const handleSubmit = () => {
    const isValid = isUsernameValid(user.username);
    if (user.username.length > 30) {
      return toast({
        title: "Error",
        description: "Username cannot be more than 30 characters",
        variant: "destructive",
      });
    }
    if (user.username.length <= 2) {
      return toast({
        title: "Error",
        description: "Username cannot be less than 3 characters",
        variant: "destructive",
      });
    }
    if (user.username === "admin") {
      return toast({
        title: "Error",
        description: "Username cannot be admin",
        variant: "destructive",
      });
    }
    if (user.username === "Admin") {
      return toast({
        title: "Error",
        description: "Username cannot be Admin",
        variant: "destructive",
      });
    }
    if (user.username === "ADMIN") {
      return toast({
        title: "Error",
        description: "Username cannot be ADMIN",
        variant: "destructive",
      });
    }
    if (!isValid) {
      return toast({
        title: "Error",
        description: "Username cannot contain special characters",
        variant: "destructive",
      });
    }

    const changedValues: any = {};
    for (const key in user) {
      if (
        user[key as keyof getUserDataTypes] !==
        initialUser[key as keyof getUserDataTypes]
      ) {
        changedValues[key as any] = user[key as keyof getUserDataTypes];
      }
    }

    EditProfile.mutate({ ...changedValues, _id: user._id });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="mx-11 bg-Secondary-background pb-6 pl-5 pt-5 max-md:pl-0">
      <div className=" pl-4">
        <h2 className="font-medium tracking-wide text-neutral-200">
          {" "}
          PERSONAL INFORMATION
        </h2>
        <form className="mt-10 flex flex-col gap-5">
          <ProfileInput
            type="text"
            name="username"
            label="User Name"
            onChange={handleOnchange}
            required={true}
            value={user.username}
          />
          <ProfileInput
            type="text"
            name="fullName"
            label="Full Name"
            onChange={handleOnchange}
            required={true}
            value={user.fullName}
          />
        </form>
      </div>

      <div className="mt-16 pl-4">
        <h2 className="font-medium tracking-wide text-neutral-200">
          {" "}
          ABOUT YOURSELF
        </h2>
        <form className="mt-8 flex flex-col gap-5">
          <div className="flex max-md:flex-col">
            <label
              htmlFor="username"
              className="flex   w-full max-w-[280px]  items-center text-base font-medium text-neutral-200 text-opacity-60"
            >
              Biographical Info
            </label>

            <textarea
              name="bio"
              value={user.bio}
              rows={5}
              onChange={handleTextareaChange}
              placeholder={"Write a short description about yourself"}
              className="placeholder:text-_welcometext_lightblue font-Inter border-_light_white mr-6 w-2/3 rounded-md border border-opacity-30 bg-inherit bg-opacity-40 px-2 py-2 text-sm font-normal tracking-wide text-neutral-400 outline-none transition-all duration-200 ease-linear placeholder:font-light placeholder:text-opacity-50 focus-within:border-opacity-75  focus-within:text-neutral-200 max-md:mr-0 max-md:mt-2  max-md:w-11/12"
            ></textarea>
          </div>
        </form>
      </div>
      <div className="mb-4 mr-28  mt-12 flex justify-end max-md:mr-10">
        <button
          onClick={handleSubmit}
          className={clsx(
            " flex items-center  rounded-md bg-btn-primary px-3 py-1 font-normal tracking-wide text-btn-primary ",
            isEdit
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-30",
            EditProfile.isLoading
              ? "pointer-events-none opacity-30"
              : "pointer-events-auto opacity-100",
          )}
        >
          {EditProfile.isLoading ? (
            <>
              <span className="pr-2">updating</span>{" "}
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="23"
                visible={EditProfile.isLoading}
              />
            </>
          ) : (
            " Apply Changes"
          )}
        </button>
      </div>
    </div>
  );
};

export default ProfileEdit;
