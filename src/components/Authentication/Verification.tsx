import React, { useEffect, useLayoutEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import clsx from "clsx";
import { useMutation } from "@tanstack/react-query";
import { userApis } from "@/Apis/APIs";
import { useToast } from "../ui/use-toast";
import { LoggedIn } from "@/redux/slice/authSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";

const Verification = ({ setAuth }: { setAuth: any }) => {
  const [seconds, setSeconds] = React.useState(30);
  const [code, setCode] = React.useState("");
  const { toast } = useToast();
  const [isResendDisabled, setIsResendDisabled] = React.useState(true);
  const dispatch = useAppDispatch();

  const ResendCode = useMutation(
    (email: string) => userApis.sendVerificationCode(email),
    {
      onSuccess: (data) => {
        toast({
          description: "Code has been sent to your email",
          type: "background",
          variant: "default",
        });
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  const VerifyCode = useMutation(
    (data: { email: string; code: number }) => userApis.verfiyEmail(data),
    {
      onSuccess: (data) => {
        dispatch(LoggedIn(data));
      },
      onError: (error: any) => {
        toast({
          description: error?.response?.data,
          type: "foreground",
          variant: "destructive",
        });
      },
    },
  );

  const handleCodeVerification = () => {
    if (!code || code.trim() == "")
      return toast({
        description: "Please enter your verification code",
        type: "foreground",
        variant: "destructive",
      });
    if (!localStorage.getItem("email"))
      return toast({
        description: "Something went wrong please try again",
        type: "foreground",
        variant: "destructive",
      });
    if (code.length != 6)
      return toast({
        description: "Please enter a valid verification code",
        type: "foreground",
        variant: "destructive",
      });
    VerifyCode.mutate({
      email: localStorage.getItem("email")!,
      code: parseInt(code),
    });
  };

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [seconds]);

  return (
    <Card className="border-none bg-neutral-800 px-12 py-10 ">
      <CardHeader className="px-1">
        <CardTitle className="mx-0 px-0 text-center text-neutral-100">
          Email verification
        </CardTitle>
      </CardHeader>

      <div>
        <CardDescription className=" mx-5 rounded-lg bg-green-200  px-8  py-2 text-center text-green-900">
          We have sent a verification code to your email. Please enter the code
          below to verify your email.
        </CardDescription>
      </div>

      <br />
      <div className="px-5">
        <Input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mt-1 border-neutral-600 bg-neutral-900  text-neutral-200 placeholder:text-neutral-500 focus-visible:ring-transparent"
          placeholder="Enter your verification code"
        />
      </div>
      <div className="px-5">
        <Button
          disabled={VerifyCode.isLoading}
          variant="outline"
          onClick={handleCodeVerification}
          className={clsx(
            "mt-10 w-full text-base transition-transform duration-75 ease-linear active:scale-95 ",
            VerifyCode.isLoading ? "opacity-60" : " opacity-100",
          )}
        >
          Verify
        </Button>
      </div>
      <div className="mt-7 flex items-center justify-center gap-2">
        <button
          disabled={isResendDisabled}
          onClick={() => {
            setIsResendDisabled(true);
            setSeconds(30);
            let email = localStorage.getItem("email");
            if (email) ResendCode.mutate(email);
          }}
          className={clsx(
            "text-xs font-normal text-Header-secondary",
            isResendDisabled
              ? "text-Header-secondary opacity-60 "
              : "text-Header-primary underline underline-offset-2 opacity-100",
          )}
        >
          Resend code in
        </button>
        <p className="text-sm text-Header-primary">
          {" "}
          00:{seconds < 10 ? `0${seconds}` : seconds}
        </p>
      </div>
    </Card>
  );
};

export default Verification;
