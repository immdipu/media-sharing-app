import CreateRoom from "@/components/Buttons/CreateRoom";
import { Input } from "@/components/ui/input";
import Room from "@/components/room";
import Dialog from "@/components/Dialog";
import CreateRoomData from "@/components/createRoom";
import Avatar from "@/components/Avatar/Avatar";

export default function Home() {
  return (
    <section className="min-h-screen w-full bg-Main-background">
      <br />

      <div className="flex justify-end ">
        <div className="w-full  " />

        <h3 className="h-fit w-full text-center  text-xl font-bold text-Header-primary">
          Welcome to MediaSharing
        </h3>
        <div className="flex w-full justify-end  pr-24">
          <Avatar />
        </div>
      </div>

      <section className="">
        <section className="mt-7 flex gap-2 px-20">
          <Dialog
            button={<CreateRoom />}
            data={<CreateRoomData />}
            title="Create a new room"
          />
          <Input
            className="border-neutral-500 bg-neutral-700 text-neutral-100 placeholder:text-neutral-400"
            placeholder="Search room, people or tags"
          />
        </section>
        <section>
          <h3 className="mt-10 px-20 text-lg font-bold text-neutral-50">
            Your rooms
          </h3>
          <section className="mt-7 flex flex-col gap-10 px-20 ">
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
          </section>
        </section>
        Avatar
      </section>
    </section>
  );
}
