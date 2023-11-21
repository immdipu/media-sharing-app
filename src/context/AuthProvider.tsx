"use client";
import { useRef, useContext, useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import { jwtDecode } from "jwt-decode";
import React from "react";
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

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((state) => state.auth);
  const [showModal, setShowModal] = React.useState(false);
  const [Auth, setAuth] = useState<"login" | "verify code">("login");

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      const decode = jwtDecode(token);
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  }, [user.isUserAuthenticated]);

  return (
    <section>
      {showModal && (
        <Dialog modal open>
          <DialogOverlay className="bg-Overlay-background " />
          <DialogContent className="border border-primary-color bg-Secondary-background p-0 sm:max-w-[425px]">
            {Auth === "login" ? (
              <LoginCard setAuth={setAuth} />
            ) : Auth === "verify code" ? (
              <Verification setAuth={setAuth} />
            ) : null}
          </DialogContent>
        </Dialog>
      )}
      {children}
    </section>
  );
};

export default AuthProvider;
