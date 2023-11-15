import AvatarCard from "./AvatarCard";
import React from "react";
import TitleLogo from "./TitleLogo";
import { Button } from "../ui/button";

const index = () => {
  return (
    <div className="border w-full flex flex-col  border-neutral-500 rounded-xl px-5 py-2 bg-neutral-700">
      <h4 className="font-medium flex items-center gap-2 text-neutral-50 mb-3">
        <TitleLogo color="#ffffff" opacity={0.2} /> Music video room
      </h4>
      <section className="flex gap-1 overflow-hidden">
        <AvatarCard />
        <AvatarCard />
        <AvatarCard />
        <AvatarCard />
        <AvatarCard />
        <AvatarCard />
      </section>
      <section className="my-3">
        <Button variant={"secondary"} className="text-lg w-full mt-3">
          Join
        </Button>
      </section>
    </div>
  );
};

export default index;
