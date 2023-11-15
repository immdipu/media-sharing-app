import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const index = () => {
  return (
    <div>
      <form action="">
        <div>
          <Label className="text-neutral-200 font-normal">Room name</Label>
          <Input
            placeholder="Enter room name"
            className="bg-neutral-700 mt-1 placeholder:text-neutral-400"
          />
        </div>

        <div className="mt-3">
          <Label className="text-neutral-200 font-normal">
            Maximum members{" "}
          </Label>
          <Input
            placeholder="Enter maximum members"
            type="number"
            min={0}
            className="bg-neutral-700 mt-1 placeholder:text-neutral-400"
          />
        </div>
        <Button
          variant={"outline"}
          className="mt-8 w-full active:scale-95 duration-75 ease-linear transition-transform"
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default index;
