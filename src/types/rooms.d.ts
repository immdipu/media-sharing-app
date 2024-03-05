interface membersTypes {
  _id: string;
  fullName: string;
  username: string;
  profilePic: string;
  verified: boolean;
}

interface ReactionTypes extends MessageReactionDataTypes {
  sender: membersTypes;
}

interface EmojisPopOverProps {
  children: React.ReactNode;
  showEmojis: boolean;
  setShowEmojis: React.Dispatch<React.SetStateAction<boolean>>;
  messageId: string;
  reactions: ReactionTypes[];
}
