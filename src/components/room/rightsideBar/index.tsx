import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chat from "@/components/room/rightsideBar/chat";
import Users from "./users";

const index = () => {
  return (
    <div className="w-96 shrink-0 bg-Secondary-background ">
      <Tabs defaultValue="chat" className="w-auto">
        <TabsList className="sticky top-0 z-10 w-full bg-Input-background   ">
          <TabsTrigger value="chat" className="w-full text-Paragraph-primary ">
            chat
          </TabsTrigger>
          <TabsTrigger value="users" className="w-full text-Paragraph-primary">
            users
          </TabsTrigger>

          <TabsTrigger value="media" className="w-full text-Paragraph-primary">
            Media
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="w-full text-Paragraph-primary"
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
