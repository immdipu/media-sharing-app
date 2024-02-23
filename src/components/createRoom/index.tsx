"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useAppSelector, useSocket } from "@/hooks";
import { HiMiniPlus } from "react-icons/hi2";
import CreatableSelect from "react-select/creatable";
import RoomType from "./RoomType";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MemeberLimitSelectoptions } from "@/lib/constants";

const CreateRoom = () => {
  const [roomDetails, setRoomDetails] = React.useState({
    name: "",
    membersLimit: null,
    roomType: "public",
  });
  const { toast } = useToast();
  const { isOnline, EmitCustomEvent } = useSocket();
  const [isOpen, setIsOpen] = React.useState(false);
  const user = useAppSelector((state) => state.auth);

  const handleSubmit = () => {
    if (roomDetails.name === "") {
      toast({
        description: "Room name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    if (!roomDetails.membersLimit || roomDetails.membersLimit < 1) {
      toast({
        description: "Members limit cannot be less than 1",
        variant: "destructive",
      });
      return;
    }

    if (isOnline && user.isUserAuthenticated) {
      EmitCustomEvent("create-room", {
        ...roomDetails,
        admin: user.id,
      });
      setIsOpen(false);
      setRoomDetails({
        name: "",
        membersLimit: null,
        roomType: "public",
      });
    }
  };

  const getOptionStyle = (
    styles: any,
    { data, isFocused, isSelected }: any,
  ) => {
    return {
      ...styles,
      color: isSelected ? "#f0f8ff" : "#f0f8ffd4",
      backgroundColor: "#262626",
      cursor: "pointer",
      "&:hover": {
        border: "none",
        backgroundColor: "#2626268f",
      },
    };
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogOverlay className="bg-Overlay-background " />
      <DialogTrigger asChild>
        <Button className="flex items-center bg-btn-primary font-medium   text-btn-primary">
          Create a room <HiMiniPlus className="ml-1 text-lg text-btn-primary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="border border-primary-color bg-Secondary-background sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-medium tracking-wide text-Header-primary">
            Create a new room
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="">
            <div>
              <Label className="px-1 text-base font-normal text-Header-secondary">
                Room name
              </Label>

              <Input
                value={roomDetails.name}
                onChange={(e) =>
                  setRoomDetails({ ...roomDetails, name: e.target.value })
                }
                placeholder="Enter room name"
                className="mt-1 border-primary-color  bg-Input-background placeholder:text-neutral-400"
              />
            </div>
            <div>
              <RoomType
                setRoomDetails={setRoomDetails}
                roomDetails={roomDetails}
              />
            </div>

            <div className="mb-1 mt-4">
              <Label className="mb-3 px-1  py-3 text-base font-normal text-Header-secondary">
                Maximum members{" "}
              </Label>

              <CreatableSelect
                placeholder="Enter maximum members"
                className=" mt-1 placeholder:font-light placeholder:text-neutral-400"
                onChange={(e: any) => {
                  if (!e) {
                    setRoomDetails({
                      ...roomDetails,
                      membersLimit: null,
                    });
                    return;
                  }
                  setRoomDetails({
                    ...roomDetails,
                    membersLimit: e.value,
                  });
                }}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? "#fffffff7" : "#a7a7a74a",
                    backgroundColor: "#2f2f2f",
                    outline: "none",
                    boxShadow: "none",
                    color: "red",

                    "&:hover": {
                      borderColor: "#a7a7a74a",
                    },
                  }),
                  option: getOptionStyle,
                  input: (provided) => ({
                    ...provided,
                    color: "white",
                  }),
                  singleValue: (baseStyles) => ({
                    ...baseStyles,
                    color: "#f0f8ffd4",
                  }),
                }}
                isClearable
                options={MemeberLimitSelectoptions}
              />
            </div>
            <Button
              onClick={handleSubmit}
              className="mt-8 w-full bg-btn-primary tracking-wide text-btn-primary transition-transform duration-75 ease-linear hover:opacity-80 active:scale-95"
            >
              Create
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoom;
