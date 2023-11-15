import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const Verification = () => {
  return (
    <Card className="py-10 px-12 bg-neutral-800 border-none ">
      <CardHeader className="px-1">
        <CardTitle className="px-0 text-neutral-100 mx-0 text-center">
          Email verification
        </CardTitle>
      </CardHeader>

      <div>
        <CardDescription className=" py-2 rounded-lg bg-green-200  text-green-900  mx-5 px-8 text-center">
          We have sent a verification code to your email. Please enter the code
          below to verify your email.
        </CardDescription>
      </div>

      <br />
      <div className="px-5">
        <Input
          type="text"
          className="mt-1 bg-neutral-900 border-neutral-600  focus-visible:ring-transparent placeholder:text-neutral-500 text-neutral-200"
          placeholder="Enter your verification code"
        />
      </div>
      <div className="px-5">
        <Button
          variant="outline"
          className="w-full mt-10 active:scale-95 duration-75 ease-linear transition-transform text-base "
        >
          Verify
        </Button>
      </div>
    </Card>
  );
};

export default Verification;
