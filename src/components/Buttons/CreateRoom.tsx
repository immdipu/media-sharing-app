import React from "react";
import { Button } from "../ui/button";
import { HiMiniPlus } from "react-icons/hi2";

const CreateRoom = () => {
  return (
    <Button className="text-button-primary bg-button-background flex items-center   font-medium">
      Create a room <HiMiniPlus className="text-button-primary ml-1 text-lg" />{" "}
    </Button>
  );
};

export default CreateRoom;
