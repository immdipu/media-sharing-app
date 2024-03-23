import React from "react";
import { MdMessage } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { userApis } from "@/Apis/APIs";
import { useToast } from "../ui/use-toast";
import { Mail } from "lucide-react";

const MessageButton = ({ _id }: { _id: string }) => {
  const { toast } = useToast();

  const { mutate, isLoading } = useMutation(
    (id: string) => userApis.getSingleChatByuserId(id),
    {
      onSuccess: (data) => {
        console.log("data", data);
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
      className="rounded-full border border-secondary-color px-2 py-2 hover:bg-secondary-hover"
    >
      <Mail size={20} className="text-xl text-Paragraph-primary" />
    </button>
  );
};

export default MessageButton;
