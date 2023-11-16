import React from "react";
import { Textarea } from "@/components/ui/textarea";

const MessageInput = () => {
  return (
    <div>
      <Textarea
        className="resize-none rounded-sm bg-neutral-800 placeholder:text-neutral-400 text-neutral-200 "
        placeholder="Write your message"
        rows={2}
      />
    </div>
  );
};

export default MessageInput;
