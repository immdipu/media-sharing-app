import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const index = () => {
  return (
    <div className="">
      <form action="">
        <div>
          <Label className="font-normal text-neutral-200">Room name</Label>
          <Input
            placeholder="Enter room name"
            className="bg-Input-background border-primary-color mt-1 placeholder:text-neutral-400"
          />
        </div>

        <div className="mt-3">
          <Label className="font-normal text-neutral-200">
            Maximum members{" "}
          </Label>
          <Input
            placeholder="Enter maximum members"
            type="number"
            min={0}
            className="bg-Input-background mt-1 placeholder:text-neutral-400"
          />
        </div>
        <Button className="bg-button-background text-button-primary mt-8 w-full transition-transform duration-75 ease-linear hover:opacity-80 active:scale-95">
          Create
        </Button>
      </form>
    </div>
  );
};

export default index;
