"use client";
import React from "react";
import Login from "@/components/Authentication/Login";
import { Card } from "@/components/ui/card";
import Verification from "./Verification";

const Authentication = () => {
  return (
    <Card className="max-w-xl mx-auto grid mt-36 bg-transparent border-neutral-600 ">
      {/* <Login /> */}
      <Verification />
    </Card>
  );
};

export default Authentication;
