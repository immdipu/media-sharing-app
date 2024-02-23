import React from "react";
import { Button } from "../ui/button";
import { HiMiniPlus } from "react-icons/hi2";

const CreateRoom = () => {
  return (
    <Button className="bg-btn-primary text-btn-primary flex items-center   font-medium">
      Create a room <HiMiniPlus className="text-btn-primary ml-1 text-lg" />{" "}
    </Button>
  );
};

export default CreateRoom;
