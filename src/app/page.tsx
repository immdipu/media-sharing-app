import CreateRoom from "@/components/createRoom";
import Avatar from "@/components/Avatar/Avatar";
import Room from "@/components/room/Room";
import SideBarToggleButton from "@/components/Buttons/SideBarToggleButton";
import CardOne from "@/components/card/info/CardOne";
import { APP_NAME } from "@/lib/constants";
import RecommedationUser from "@/components/recommendation/user/Index";

export default function Home() {
  return (
    <section className="min-h-screen w-full   bg-Main-background">
      <br />
      <div className="flex items-center justify-end ">
        <div className="w-full max-md:hidden" />
        <SideBarToggleButton />
        <h3 className=" h-fit w-full  text-center  text-xl font-bold text-Header-primary">
          Welcome to {APP_NAME}
        </h3>
        <div className="flex w-full justify-end   pr-24  max-md:w-fit max-md:pr-3">
          <Avatar />
        </div>
      </div>

      <section className="flex w-full overflow-hidden ">
        <Room />
        <section className="cardContainer  mr-5 mt-7 flex h-[calc(100vh-130px)] w-fit shrink-0 flex-col gap-3 overflow-hidden  max-[850px]:hidden">
          <CardOne
            header="🎉 Create and Share "
            content="Create your own room and start watching YouTube videos with friends."
            classNames=""
          />
          <CardOne
            header="👁️ Discover Rooms "
            classNames="bg-green-500"
            content="Explore public rooms and join the community in group viewings.

"
          />
          <CardOne
            classNames="bg-purple-500"
            header="🚀 Share the Experience "
            content="Invite friends to your room and enjoy videos together in real-time.

"
          />
        </section>
      </section>
    </section>
  );
}
