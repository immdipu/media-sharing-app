import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chat from "@/components/room/rightsideBar/chat";
import Users from "./users";

const index = () => {
  return (
    <div className="bg-Secondary-background w-96 shrink-0 ">
      <Tabs defaultValue="chat" className="w-auto">
        <TabsList className="bg-Input-background sticky top-0 z-10 w-full   ">
          <TabsTrigger value="chat" className="text-Paragraph-primary w-full ">
            chat
          </TabsTrigger>
          <TabsTrigger value="users" className="text-Paragraph-primary w-full">
            users
          </TabsTrigger>

          <TabsTrigger value="media" className="text-Paragraph-primary w-full">
            Media
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="text-Paragraph-primary w-full"
          >
            settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="chat" className="h-[calc(100vh-56px)]   ">
          <Chat />
        </TabsContent>
        <TabsContent value="users">
          <Users />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default index;
