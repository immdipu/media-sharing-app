import CreateRoom from "@/components/Buttons/CreateRoom";
import { Input } from "@/components/ui/input";
import Room from "@/components/room";

export default function Home() {
  return (
    <section className=" w-full min-h-screen bg-neutral-800">
      <br />
      <h3 className="text-center h-fit  text-neutral-50 text-xl font-bold">
        Welcome to MediaSharing
      </h3>

      <section className="">
        <section className="px-20 mt-7 flex gap-2">
          <CreateRoom />
          <Input
            className="bg-neutral-700 border-neutral-500 placeholder:text-neutral-400 text-neutral-100"
            placeholder="Search room, people or tags"
          />
        </section>
        <section>
          <h3 className="text-neutral-50 text-lg font-bold mt-10 px-20">
            Your rooms
          </h3>
          <section className="px-20 mt-7 flex gap-2">
            <Room />
          </section>
        </section>
      </section>
    </section>
  );
}
