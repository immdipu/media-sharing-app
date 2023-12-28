import React from "react";
import { useAppSelector } from "./reduxHooks";

const useUserRoomActivity = () => {
  const user = useAppSelector((state) => state.auth);
  const room = useAppSelector((state) => state.room);
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);

  const userJoinedActivity = React.useMemo(() => {
    if (user && room && JoinedRoom) {
      return JoinedRoom?.roomActivity.find((activity) =>
        activity.users.find((u) => u._id === user.id),
      );
    }
    return null;
  }, [user, room, JoinedRoom]);

  const isMySharedActivity = React.useMemo(() => {
    if (user && room && JoinedRoom) {
      return JoinedRoom?.roomActivity.find(
        (activity) => activity.admin._id === user.id,
      );
    }
    return null;
  }, [user, room, JoinedRoom]);

  const AmIWatchingMyActivity = React.useMemo(() => {
    if (user && room && JoinedRoom && isMySharedActivity) {
      return isMySharedActivity?.users.find((u) => u._id === user.id);
    }
    return null;
  }, [user, room, JoinedRoom, isMySharedActivity]);

  const AmIWatchingOtherActivity = React.useMemo(() => {
    if (user && room && JoinedRoom) {
      return JoinedRoom?.roomActivity.find((activity) =>
        activity.users.find(
          (u) => u._id === user.id && activity.admin._id !== user.id,
        ),
      );
    }
    return null;
  }, [user, room, JoinedRoom]);

  const AmIWatchingActivity = React.useMemo(() => {
    if (user && room && JoinedRoom) {
      return JoinedRoom?.roomActivity.find((activity) =>
        activity.users.find((u) => u._id === user.id),
      );
    }
    return null;
  }, [user, room, JoinedRoom]);

  return {
    userJoinedActivity,
    isMySharedActivity,
    AmIWatchingMyActivity,
    AmIWatchingOtherActivity,
    AmIWatchingActivity,
  };
};

export default useUserRoomActivity;
