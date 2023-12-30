"use client";
import React, { useState, useEffect, useContext } from "react";
import { MainMenu } from "@excalidraw/excalidraw";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";
import { ActivityType } from "@/types/roomActivity";
import clsx from "clsx";

const OtherUserExcalidraw = () => {
  const { OtherExcalidraw, OtherSelectedChanged, othermedia } =
    useContext(RoomContext);
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);

  useEffect(() => {
    import("@excalidraw/excalidraw").then(
      (comp) => (OtherExcalidraw.current = comp.Excalidraw),
    );
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("excalidraw");
    if (data && OtherExcalidraw.current && excalidrawAPI) {
      // setExcaliData(JSON.parse(data));
      // excalidrawAPI?.updateScene(JSON.parse(data));
      excalidrawAPI?.updateScene(JSON.parse(data));
    }
  }, [OtherSelectedChanged, OtherExcalidraw, excalidrawAPI]);

  return (
    <>
      <section
        className={clsx(
          "Excalidrawing h-full overflow-hidden  px-2 pt-4 ",
          othermedia === ActivityType.Drawing ? "block h-[80vh]" : "hidden",
        )}
      >
        {OtherExcalidraw.current && (
          <OtherExcalidraw.current
            excalidrawAPI={(api: any) => {
              setExcalidrawAPI(api);
            }}
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
          </OtherExcalidraw.current>
        )}
      </section>
    </>
  );
};

export default OtherUserExcalidraw;
