import React from "react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import Link from "next/link";

interface JoinButtonProps {
  id: string;
  members: membersTypes[] | undefined;
  membersLimit: number;
  adminId: string;
  userId: string | null;
  isAuthenticated: boolean;
}

const JoinButton: React.FC<JoinButtonProps> = ({
  id,
  members,
  membersLimit,
  isAuthenticated,
  adminId,
  userId,
}) => {
  return (
    <section className="my-3">
      {members && members.length === membersLimit && adminId !== userId ? (
        <Button variant={"destructive"} className="mt-3  text-lg opacity-90">
          Room is full
        </Button>
      ) : (
        <Link
          href={`/room/${id}`}
          className={clsx(
            " group block w-full rounded-sm border border-dashed border-success-muted py-1 text-center text-lg text-btn-success-dark duration-300  hover:border-success-color   hover:bg-secondary-hover",
            !isAuthenticated && "pointer-events-none opacity-60",
          )}
        >
          Join Room
        </Link>
      )}
    </section>
  );
};

export default JoinButton;
