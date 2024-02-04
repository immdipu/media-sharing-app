/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useRef, useContext, useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoginCard from "@/components/Authentication/Login";
import Verification from "@/components/Authentication/Verification";
import { useMutation } from "@tanstack/react-query";
import { userApis } from "@/Apis/APIs";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { LoggedIn } from "@/redux/slice/authSlice";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((state) => state.auth);
  const [showModal, setShowModal] = React.useState(false);
  const dispatch = useAppDispatch();
  const { resolvedTheme, setTheme } = useTheme();
  const [Auth, setAuth] = useState<"login" | "verify code">("login");

  const AutoLogin = useMutation(() => userApis.AutoLogin(), {
    onSuccess: (data) => {
      dispatch(LoggedIn(data));
    },
    onError: (error) => {
      setShowModal(true);
    },
  });

  useEffect(() => {
    setTheme("darkTheme");
    let token = localStorage.getItem("token");
    if (token && !user.isUserAuthenticated && !showModal) {
      AutoLogin.mutate();
    }
    if (!token) {
      setShowModal(true);
    }
  }, [user.isUserAuthenticated]);

  return (
    <section>
      {AutoLogin.isLoading && (
        <section>
          <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-Secondary-background bg-opacity-50">
            <div>
              <div className="h-14 w-14 animate-spin rounded-full border-b-2 border-t-2 border-primary-color"></div>
              <div className="text-center text-Header-primary">
                You are being logged in...
              </div>
            </div>
          </div>
        </section>
      )}
      {showModal && (
        <Dialog modal open>
          <DialogOverlay className="bg-Overlay-background " />
          <DialogContent className="border border-primary-color bg-Secondary-background p-0 sm:max-w-[425px]">
            {Auth === "login" ? (
              <LoginCard setAuth={setAuth} setShowModal={setShowModal} />
            ) : Auth === "verify code" ? (
              <Verification setAuth={setAuth} setShowModal={setShowModal} />
            ) : null}
          </DialogContent>
        </Dialog>
      )}
      {children}
    </section>
  );
};

export default AuthProvider;
