import AvatarCard from "./AvatarCard";
import React from "react";

const index = () => {
  return (
    <div className="border w-full flex flex-col  border-neutral-500 rounded-xl px-5 py-2 bg-neutral-700">
      <h4 className="font-medium text-neutral-50 mb-3">Music video room</h4>
      <section className="flex gap-4">
        <AvatarCard />
        <AvatarCard />
        <AvatarCard />
        <AvatarCard />
        <AvatarCard />
        <AvatarCard />
      </section>
    </div>
  );
};

export default index;
