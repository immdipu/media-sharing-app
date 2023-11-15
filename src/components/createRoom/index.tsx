import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const index = () => {
  return (
    <div>
      <Label className="text-neutral-200 font-normal">Room name</Label>
      <Input
        placeholder="Enter room name"
        className="bg-neutral-700 mt-2 placeholder:text-neutral-400"
      />
    </div>
  );
};

export default index;
