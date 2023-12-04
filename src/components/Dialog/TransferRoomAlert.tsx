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
        <li className=" flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-Main-background">
          <RiAdminFill className="text-lg text-green-600" />{" "}
          <span className="text-sm text-Paragraph-primary">
            Transfer Ownership
          </span>
        </li>
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
            className=" bg-button-background text-button-primary hover:opacity-95"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
