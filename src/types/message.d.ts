declare interface MessageReactionDataTypes {
  sender: {
    _id: string;
  };
  emoji: string;
  msgId: string;
  createdAt: Date;
}

type MessageOptionsProps = {
  _id: string;
  showEmojis: boolean;
  setShowEmojis: React.Dispatch<React.SetStateAction<boolean>>;
  reactions: ReactionTypes[];
};
