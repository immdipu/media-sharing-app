"use client";
import React, { useState, useEffect, useContext } from "react";
import { MainMenu } from "@excalidraw/excalidraw";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";

const OtherUserExcalidraw = () => {
  const { OtherExcalidraw, OtherSelectedChanged } = useContext(RoomContext);
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);

  useEffect(() => {
    if (!OtherExcalidraw.current) return;
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
      {OtherExcalidraw && (
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
    </>
  );
};

export default OtherUserExcalidraw;
