import { Input } from "@/components/ui/input";
import Room from "@/components/room";
import Dialog from "@/components/Dialog";
import CreateRoom from "@/components/createRoom";
import Avatar from "@/components/Avatar/Avatar";
import RoomCard from "@/components/room/RoomCard";
import SideBarToggleButton from "@/components/Buttons/SideBarToggleButton";

export default function Home() {
  return (
    <section className="min-h-screen w-full  bg-Main-background">
      <br />

      <div className="flex items-center justify-end ">
        <div className="w-full max-md:hidden" />
        <SideBarToggleButton />
        <h3 className=" h-fit w-full  text-center  text-xl font-bold text-Header-primary">
          Welcome to MediaSharing
        </h3>
        <div className="flex w-full justify-end   pr-24  max-md:w-fit max-md:pr-3">
          <Avatar />
        </div>
      </div>

      <section className="">
        <section className="mt-7 flex gap-2 px-20 max-md:px-2">
          <CreateRoom />
          <Input
            className="border-neutral-500 bg-neutral-700 text-neutral-100 placeholder:text-neutral-400"
            placeholder="Search room, people or tags"
          />
        </section>
        <section>
          <h3 className="mt-10 px-20 text-lg font-bold text-neutral-50 max-md:px-3">
            Rooms
          </h3>
          <RoomCard />
        </section>
      </section>
    </section>
  );
}
