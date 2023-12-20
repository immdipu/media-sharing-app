"use client";
import React, { useState, useEffect, ComponentType } from "react";
import {
  AppState,
  ExcalidrawImperativeAPI,
  ExcalidrawProps,
} from "@excalidraw/excalidraw/types/types";
import { LiveCollaborationTrigger, MainMenu } from "@excalidraw/excalidraw";
const Excalidraws = () => {
  const [Excalidraw, setExcalidraw] =
    useState<ComponentType<ExcalidrawProps> | null>(null);

  useEffect(() => {
    import("@excalidraw/excalidraw").then((comp) =>
      setExcalidraw(comp.Excalidraw),
    );
  }, []);

  return (
    <div className="w-full">
      <section className="h-[80vh]">
        {Excalidraw && (
          <Excalidraw
            onChange={(e) => console.log(e)}
            renderTopRightUI={() => (
              <LiveCollaborationTrigger
                isCollaborating={false}
                onSelect={() => {
                  window.alert("You clicked on collab button");
                }}
              />
            )}
          >
            <MainMenu>
              <MainMenu.DefaultItems.Export />
              <MainMenu.DefaultItems.ClearCanvas />
              <MainMenu.DefaultItems.SaveAsImage />
              <MainMenu.DefaultItems.ToggleTheme />
              <MainMenu.DefaultItems.Help />
              <MainMenu.DefaultItems.LoadScene />
              <MainMenu.DefaultItems.ChangeCanvasBackground />
            </MainMenu>
          </Excalidraw>
        )}
      </section>
      <section className="h-full w-full "></section>
    </div>
  );
};

export default Excalidraws;
