import React from "react";
import AvatarCard from "../atoms/AvatarCard";
import EmptyRoomAvatarCard from "../atoms/EmptyRoomAvatarCard";

interface RoomMembersProps {
  members: membersTypes[];
  membersLimit: number;
}

const RoomMembers: React.FC<RoomMembersProps> = ({ members, membersLimit }) => {
  const renderEmptyCards = (count: number) => {
    const EmtpyCards = [];
    for (let i = 0; i < count; i++) {
      EmtpyCards.push(<EmptyRoomAvatarCard key={i} />);
    }
    return EmtpyCards;
  };

  return (
    <section className=" max-w-fulll flex h-[104px] w-full shrink-0 flex-wrap  gap-1 gap-y-5 overflow-y-hidden">
      {members &&
        members.length > 0 &&
        members?.map((member, index) => <AvatarCard {...member} key={index} />)}

      {members.length > 0 && renderEmptyCards(membersLimit - members.length)}

      {members && members.length === 0 && renderEmptyCards(7)}
    </section>
  );
};

export default RoomMembers;
