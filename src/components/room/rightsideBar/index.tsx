import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chat from "@/components/chat";

const index = () => {
  return (
    <div className="w-96 shrink-0 bg-neutral-700 ">
      <Tabs defaultValue="chat" className="w-auto ">
        <TabsList className="w-full bg-neutral-600">
          <TabsTrigger value="chat" className="w-full text-neutral-200">
            chat
          </TabsTrigger>
          <TabsTrigger value="users" className="w-full text-neutral-200">
            users
          </TabsTrigger>

          <TabsTrigger value="media" className="w-full text-neutral-200">
            Media
          </TabsTrigger>
          <TabsTrigger value="settings" className="w-full text-neutral-200">
            settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="chat" className="h-full ">
          <Chat />
        </TabsContent>
        <TabsContent value="users">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default index;
