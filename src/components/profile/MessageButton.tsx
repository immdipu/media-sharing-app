import React from "react";
import { MdMessage } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { userApis } from "@/Apis/APIs";
import { useToast } from "../ui/use-toast";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";

const MessageButton = ({ _id }: { _id: string }) => {
  const { toast } = useToast();
  const router = useRouter();

  const { mutate, isLoading } = useMutation(
    (id: string) => userApis.getSingleChatByuserId(id),
    {
      onSuccess: (data) => {
        router.push(`/chat/${data.chat._id}`, {
          scroll: false,
        });
      },
      onError: (error) => {
        toast({
          description: "Something went wrong please try again",
          type: "background",
          variant: "destructive",
        });
      },
    },
  );
  return (
    <button
      onClick={() => {
        mutate(_id);
      }}
      className="rounded-full border border-third-color px-2 py-1 font-roboto text-xs font-light text-paragraph-secondary duration-200 hover:border-secondary-color hover:bg-secondary-hover"
    >
      {/* <Mail size={20} className="text-xl text-Paragraph-primary" /> */}
      {isLoading ? "Loading..." : "Message"}
    </button>
  );
};

export default MessageButton;
