import React from "react";
import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { RemoveReplyTo } from "@/redux/slice/roomSlice";
import { motion } from "framer-motion";

const ReplyInputBoxHeader = () => {
  const dispatch = useAppDispatch();
  const replyTo = useAppSelector((state) => state.room.ReplyTo);

  if (!replyTo) return null;

  return (
    <motion.div
      initial={{ opacity: 0.3, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0.3, y: 10 }}
      transition={{
        duration: 0.4,
        type: "spring",
        bounce: 0.6,
      }}
      className="mx-1 my-1  flex h-14 shrink-0 items-center overflow-hidden rounded-md   bg-Main-background bg-opacity-50 backdrop-blur-md transition-colors duration-150 ease-linear"
    >
      <div className="mx-1  h-[calc(100%-8px)] w-1 shrink-0 rounded-md bg-btn-primary" />
      <div className="h-[calc(100%-2px)] w-full">
        <p className="inline-flex">
          <span className="text-primary shrink-0 font-poppins text-xs font-medium">
            Replying to
          </span>{" "}
          <span className="line-clamp-1  px-1 text-xs capitalize text-Paragraph-primary">
            {replyTo.sender.fullName}
          </span>
        </p>
        <p className=" line-clamp-1 w-full  self-start overflow-hidden  font-poppins text-xs text-paragraph-secondary ">
          {replyTo.content}
        </p>
      </div>

      <button
        className="group h-full bg-Third-background px-1"
        onClick={() => dispatch(RemoveReplyTo())}
      >
        <IoClose className="text-white duration-200 group-hover:text-red-500" />
      </button>
    </motion.div>
  );
};

export default ReplyInputBoxHeader;
