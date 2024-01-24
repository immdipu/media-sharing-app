import React from "react";
import { userApis } from "@/Apis/APIs";
import { useQuery } from "@tanstack/react-query";
import SingleUserList from "./SingleUserList";

const FollowersList = ({ _id }: { _id: string }) => {
  const { data, isLoading, error } = useQuery(["getFollowers"], () =>
    userApis.getAllFollowers(_id),
  );

  if (isLoading) return <div>Loading...</div>;

  if (error || !data || !data.success) return <div>Something went wrong</div>;

  return (
    <div>
      {data.data.map((user) => (
        <SingleUserList key={user._id} {...user} />
      ))}
    </div>
  );
};

export default FollowersList;
