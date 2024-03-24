import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { userApis } from "@/Apis/APIs";
import Each from "@/components/Resuable/Each";
import FriendList from "@/components/chat/FriendList";
import FollowerFollowingListSkeleton from "@/components/Skeleton/FollowerFollowingListSkeleton";

interface ChatTabProps {
  searchTerm: string;
}

const FriendsTab: React.FC<ChatTabProps> = ({ searchTerm }) => {
  const [searchResult, setSearchResult] = useState<membersTypes[]>([]);
  const { data, isLoading, error } = useQuery(["getAllFriends"], () =>
    userApis.getAllFriends(),
  );

  useEffect(() => {
    if (searchTerm.length > 0 && data?.data) {
      const match = data?.data.filter(
        (user) =>
          user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.username.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setSearchResult(match);
    }
    if (searchTerm.length === 0) {
      setSearchResult([]);
    }
  }, [searchTerm, data]);

  if (isLoading)
    return (
      <div>
        <FollowerFollowingListSkeleton />
        <FollowerFollowingListSkeleton />
        <FollowerFollowingListSkeleton />
        <FollowerFollowingListSkeleton />
        <FollowerFollowingListSkeleton />
      </div>
    );
  if (error || !data) return <div>Something went wrong</div>;

  const Friendlist = searchResult.length > 0 ? searchResult : data?.data || [];

  return (
    <div>
      <h1 className="ml-5  mt-5 text-base font-medium text-Header-primary">
        All Friends
      </h1>
      <section className="chatScroll MessageContainer mt-2 flex h-[83vh] flex-col gap-2  overflow-y-auto">
        {Friendlist && FriendList.length > 0 && (
          <Each
            of={Friendlist}
            render={(item, index) => <FriendList key={index} {...item} />}
          />
        )}

        {Friendlist && FriendList.length === 0 && (
          <div className="flex h-[70vh] flex-col items-center justify-center">
            <h1 className="mt-4 text-base  text-Header-primary">
              No Friends Found
            </h1>

            <p className="mt-1 text-xs  text-paragraph-secondary">
              Start following someone or search for existing friends
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default FriendsTab;
