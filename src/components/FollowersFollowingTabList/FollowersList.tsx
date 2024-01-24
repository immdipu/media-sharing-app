import React from "react";
import { userApis } from "@/Apis/APIs";
import { useQuery } from "@tanstack/react-query";
import SingleUserList from "./SingleUserList";
import FollowerFollowingListSkeleton from "../Skeleton/FollowerFollowingListSkeleton";

const FollowersList = ({ _id }: { _id: string }) => {
  const { data, isLoading, error } = useQuery(["getFollowing"], () =>
    userApis.getAllFollowers(_id),
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
          <h1 className="text-center text-paragraph-secondary">No Followers</h1>
        </div>
      )}
    </div>
  );
};

export default FollowersList;
