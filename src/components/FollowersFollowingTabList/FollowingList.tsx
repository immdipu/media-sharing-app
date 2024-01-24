import React from "react";
import { userApis } from "@/Apis/APIs";
import { useQuery } from "@tanstack/react-query";
import SingleUserList from "./SingleUserList";
import FollowerFollowingListSkeleton from "../Skeleton/FollowerFollowingListSkeleton";

const FollowingList = ({ _id }: { _id: string }) => {
  const { data, isLoading, error } = useQuery(["getFollowers"], () =>
    userApis.getAllFollowing(_id),
  );

  if (isLoading)
    return (
      <div>
        <FollowerFollowingListSkeleton />
        <FollowerFollowingListSkeleton />
        <FollowerFollowingListSkeleton />
      </div>
    );

  if (error || !data || !data.success) return <div>Something went wrong</div>;
  return (
    <div>
      {data.data.map((user) => (
        <SingleUserList key={user._id} {...user} />
      ))}
      {data.data.length === 0 && (
        <div className="mt-7 text-center text-paragraph-secondary">
          <h1 className="text-center text-paragraph-secondary">No Following</h1>
        </div>
      )}
    </div>
  );
};

export default FollowingList;
