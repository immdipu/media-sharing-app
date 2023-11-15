import React from "react";
import { Button } from "../ui/button";
import { HiMiniPlus } from "react-icons/hi2";

const CreateRoom = () => {
  return (
    <Button
      variant={"secondary"}
      className="flex items-center font-medium   text-neutral-800"
    >
      Create a room <HiMiniPlus className="ml-1 text-neutral-800 text-lg" />{" "}
    </Button>
  );
};

export default CreateRoom;
