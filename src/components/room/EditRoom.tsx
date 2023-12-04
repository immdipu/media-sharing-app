"use client";
import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useSocket } from "@/context/SocketProvider";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { EditRoomTypes } from "@/types/socketTypes";

const EditRoom = () => {
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const [roomDetails, setRoomDetails] = React.useState({
    name: JoinedRoom?.name || "",
    membersLimit: JoinedRoom?.membersLimit || 1,
  });
  const { toast } = useToast();
  const { isOnline, EmitCustomEvent } = useSocket();
  const user = useAppSelector((state) => state.auth);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSubmit = () => {
    if (roomDetails.name === "") {
      toast({
        description: "Room name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    if (roomDetails.membersLimit < 1) {
      toast({
        description: "Members limit cannot be less than 1",
        variant: "destructive",
      });
      return;
    }

    if (isOnline && user.isUserAuthenticated) {
      let data: EditRoomTypes = {
        ...roomDetails,
        type: "EditRoom",
        user: user.id!,
        roomId: JoinedRoom?.id!,
      };
      EmitCustomEvent("room-update", data);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogOverlay className="bg-Overlay-background " />
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="w-full rounded-md border border-primary-color bg-none text-Header-primary transition-transform duration-150 ease-linear active:scale-95"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="border border-primary-color bg-Secondary-background sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-medium tracking-wide text-Header-primary">
            Edit Room
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="">
            <div>
              <Label className="font-normal text-neutral-200">Room name</Label>
              <Input
                value={roomDetails.name}
                onChange={(e) =>
                  setRoomDetails({ ...roomDetails, name: e.target.value })
                }
                placeholder="Enter room name"
                autoFocus
                className="mt-1 border-primary-color bg-Input-background placeholder:text-neutral-400"
              />
            </div>

            <div className="mt-3">
              <Label className="font-normal text-neutral-200">
                Maximum members{" "}
              </Label>
              <Input
                placeholder="Enter maximum members"
                type="number"
                value={roomDetails.membersLimit}
                onChange={(e) =>
                  setRoomDetails({
                    ...roomDetails,
                    membersLimit: parseInt(e.target.value),
                  })
                }
                min={0}
                className="mt-1 bg-Input-background placeholder:text-neutral-400"
              />
            </div>
            <Button
              onClick={handleSubmit}
              className="mt-8 w-full bg-button-background text-button-primary transition-transform duration-75 ease-linear hover:opacity-80 active:scale-95"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditRoom;
