"use client";
import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { userApis } from "@/Apis/APIs";
import { useToast } from "@/components/ui/use-toast";

const useFollow = () => {
  const queryClient = useQueryClient();
  const { AddRemoveFollowers } = userApis;
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);

  const AddRemoveFollow = useMutation(
    (userId: string) => AddRemoveFollowers(userId),
    {
      onSuccess: (data: any) => {
        queryClient.invalidateQueries(["user"]);
      },
      onError: (data: any) => {
        toast({
          title: data?.message ?? "Something went wrong",
          variant: "destructive",
        });
      },
    },
  );

  const handleFollow = (userId: string, queryToInvalidate: string) => {
    if (!userId) return;
    AddRemoveFollow.mutate(userId);
    setIsFollowing(!isFollowing);
  };

  return { isFollowing, handleFollow, setIsFollowing };
};

export default useFollow;
