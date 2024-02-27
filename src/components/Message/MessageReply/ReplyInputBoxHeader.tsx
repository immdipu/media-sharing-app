import React from "react";

const ReplyInputBoxHeader = () => {
  return (
    <div className="flex h-10 shrink-0 items-center rounded-md bg-Main-background pr-3 transition-colors duration-150 ease-linear ">
      <div className="mx-1  h-[calc(100%-8px)] w-1 shrink-0 rounded-md bg-btn-primary" />
      <p className="my-px line-clamp-2 h-[calc(100%-2px)]  self-start overflow-hidden py-1 font-poppins text-xs text-paragraph-secondary">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente
        exercitationem dolores eius fugiat, blanditiis cupiditate eveniet rerum.
        Nisi nobis enim ipsum cupiditate, consequuntur quo cumque, ratione porro
        vitae quidem recusandae!
      </p>
      <button className="h-full bg-red-500 px-1 ">x</button>
    </div>
  );
};

export default ReplyInputBoxHeader;
