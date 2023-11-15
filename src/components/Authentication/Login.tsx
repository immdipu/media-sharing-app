"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FaArrowRight } from "react-icons/fa6";

const Login = () => {
  return (
    <Card className="py-7 px-12 bg-neutral-800 border-none ">
      <CardHeader className="px-1">
        <CardTitle className="px-0 text-neutral-100 mx-0">Sign In</CardTitle>
      </CardHeader>
      <div className="grid grid-cols-2 gap-6">
        <Button variant="outline">Github</Button>
        <Button variant="outline">Google</Button>
      </div>
      <br />
      <br />
      <br />
      <div className=" h-[1px] w-full flex justify-center items-center bg-neutral-300 relative">
        <p className="bg-neutral-800 text-neutral-100 px-4">OR continue with</p>
      </div>
      <br />
      <br />

      <div>
        <Label
          htmlFor="email"
          className="text-neutral-100 pl-1 font-normal text-base"
        >
          Email
        </Label>
        <Input
          className="mt-1 bg-neutral-900 border-neutral-600 focus-visible:ring-transparent placeholder:text-neutral-500 text-neutral-200"
          placeholder="Enter your email address"
        />
      </div>
      <Button
        variant="outline"
        className="w-full mt-10 active:scale-95 duration-75 ease-linear transition-transform text-base "
      >
        Continue <FaArrowRight className="ml-2 text-neutral-700" />
      </Button>
    </Card>
  );
};
export default Login;
