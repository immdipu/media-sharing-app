import React from "react";
import { ListPlus, Check } from "lucide-react";
import { useToast } from "../ui/use-toast";

const AddQueueButton: React.FC<any> = ({
  channel,
  duration,
  duration_formatted,
  id,
  thumbnail,
  uploadedAt,
  title,
  views,
  type,
}) => {
  const { toast } = useToast();
  var isAddedToQueue = (id: string): boolean => {
    const getQueue = localStorage.getItem("YouTubequeue");
    const queue = getQueue ? JSON.parse(getQueue) : [];
    return queue.some((video: any) => video.id === id);
  };
  const [isAdded, setIsAdded] = React.useState(isAddedToQueue(id));
  const handleAddToQueue = () => {
    const getQueue = localStorage.getItem("YouTubequeue");
    const queue = getQueue ? JSON.parse(getQueue) : [];
    const newvideo = {
      channel,
      duration,
      duration_formatted,
      id,
      thumbnail,
      title,
      uploadedAt,
      views,
      type,
    };
    if (queue.length > 30) {
      return toast({
        description: "You can only add 30 videos to the queue",
        type: "background",
        variant: "destructive",
      });
    }
    if (queue.some((video: any) => video.id === id)) {
      const newQueue = queue.filter((video: any) => video.id !== id);
      localStorage.setItem("YouTubequeue", JSON.stringify(newQueue));
      setIsAdded(false);
    } else {
      queue.unshift(newvideo);
      localStorage.setItem("YouTubequeue", JSON.stringify(queue));
      setIsAdded(true);
    }
  };

  return (
    <button
      onClick={handleAddToQueue}
      className=" absolute left-1  top-1 z-10 flex h-7 w-7 scale-75 items-center justify-center  rounded-md bg-neutral-500 bg-opacity-30 opacity-0 backdrop-blur-sm transition-all duration-300 ease-linear group-hover:scale-100 group-hover:opacity-100"
    >
      {isAdded ? (
        <Check size={20} className="AnimateEntry text-green-400" />
      ) : (
        <ListPlus size={20} className="text-neutral-100" />
      )}
    </button>
  );
};

export default AddQueueButton;
