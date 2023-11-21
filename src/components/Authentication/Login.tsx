"use client";
import React, { SetStateAction } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FaArrowRight } from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query";
import { userApis } from "@/Apis/APIs";
import { Oval } from "react-loader-spinner";
import { useToast } from "../ui/use-toast";
import { GoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { LoggedIn } from "@/redux/slice/authSlice";

const Login = ({ setAuth }: { setAuth: any }) => {
  const [email, setEmail] = React.useState("");
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const { mutate, isLoading } = useMutation(
    (email: string) => userApis.LogIn(email),
    {
      onSuccess: (data) => {
        setAuth("verify code");
        localStorage.setItem("email", email);
      },
      onError: (error) => {
        toast({
          description: "Something went wrong please try again",
          type: "background",
          variant: "destructive",
        });
      },
    },
  );

  const handleSubmit = () => {
    if (!email || email.trim() == "")
      return toast({
        description: "Please enter your email address",
        type: "foreground",
        variant: "destructive",
      });
    mutate(email);
  };

  const googleLogin = useMutation(
    (data: string) => userApis.GoogleLogin(data),
    {
      onSuccess: (data) => {
        dispatch(LoggedIn(data));
      },
      onError: (data: any) => {
        const msg: string = data?.response?.data;
        if (msg) {
          console.log(msg);
        } else {
          console.log("something went wrong");
        }
      },
    },
  );

  return (
    <Card className=" border-none bg-Secondary-background  px-12 py-7  ">
      <CardHeader className="px-1">
        <CardTitle className="mx-0 px-0 text-neutral-100">Sign In</CardTitle>
      </CardHeader>
      <div className=" mt-5 flex items-center justify-center">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (credentialResponse.credential) {
              googleLogin.mutate(credentialResponse.credential);
            }
          }}
        />
      </div>
      <br />
      <br />
      <br />
      <div className=" relative flex h-[1px] w-full items-center justify-center bg-neutral-300">
        <p className="bg-Secondary-background px-4 text-neutral-100">
          OR continue with
        </p>
      </div>
      <br />
      <br />

      <div>
        <Label
          htmlFor="email"
          className="pl-1 text-base font-normal text-neutral-100"
        >
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 border-neutral-600 bg-neutral-900 text-neutral-200 placeholder:text-neutral-500 focus-visible:ring-transparent"
          placeholder="Enter your email address"
        />
      </div>
      <Button
        type="submit"
        onClick={handleSubmit}
        variant="outline"
        className="mt-10 w-full text-base transition-transform duration-75 ease-linear active:scale-95 "
      >
        {!isLoading && (
          <>
            {" "}
            <span>Continue</span>{" "}
            <FaArrowRight className="ml-2 text-neutral-700" />{" "}
          </>
        )}
        <Oval
          ariaLabel="loading-indicator"
          height={23}
          width={23}
          strokeWidth={8}
          color="blue"
          secondaryColor="gray"
          visible={isLoading}
        />
      </Button>
    </Card>
  );
};
export default Login;
