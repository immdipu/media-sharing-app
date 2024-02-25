"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { RiAdminFill } from "react-icons/ri";
import { useSocket } from "@/context/SocketProvider";
import { RoomUpdateTypes } from "@/types/socketTypes";
import { useAppSelector } from "@/hooks/reduxHooks";
import UserOptionSingleList from "../card/atom/UserOption.SingleList";

export function TransferRoomAlert({ id }: { id: string }) {
  const currentUser = useAppSelector((state) => state.auth);
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const { EmitCustomEvent } = useSocket();

  const handleTransferRoom = () => {
    const data: RoomUpdateTypes = {
      type: "RoleTransfer",
      AdminId: currentUser?.id!,
      roomId: JoinedRoom?.id!,
      ToTransferId: id,
    };
    EmitCustomEvent("room-update", data);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <UserOptionSingleList
          Icon={RiAdminFill}
          iconClass="text-green-600"
          title=" Transfer Ownership"
        />
      </AlertDialogTrigger>
      <AlertDialogContent className="border-secondary-color bg-Secondary-background">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-Header-primary">
            Transfer ownership confirmation
          </AlertDialogTitle>
          <AlertDialogDescription className="text-paragraph-secondary ">
            This action cannot be undone.This will permanently transfer the
            ownership of this room. This includes all the settings and members.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-primary-color bg-transparent text-Paragraph-primary hover:text-Header-primary">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleTransferRoom}
            className=" bg-btn-primary text-btn-primary hover:opacity-95"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
