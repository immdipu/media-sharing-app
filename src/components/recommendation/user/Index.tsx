"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { userApis } from "@/Apis/APIs";
import RecommendationCard from "./organism/RecommendationCard";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const RecommedationUser = () => {
  const [show, setShow] = useState(true);
  const { data, isLoading } = useQuery(["user"], () =>
    userApis.UserRecommendation(),
  );

  if (isLoading) {
    return;
  }

  if (!data || !data?.data || data?.data?.length === 0) {
    return;
  }

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -200, transition: { duration: 0.5 } }}
            className="rounded-md  bg-Secondary-background px-4 py-2"
          >
            <div className="flex justify-between">
              <h3 className="mb-3 font-bold text-Header-secondary">
                Who to follow
              </h3>
              <X
                onClick={() => setShow(false)}
                className=" h-4 w-4 cursor-pointer  text-paragraph-secondary duration-300 active:scale-125"
              />
            </div>
            <div className="flex gap-3">
              {data &&
                data?.data &&
                data?.data.length > 0 &&
                data?.data.map((user: any) => (
                  <RecommendationCard
                    key={user._id}
                    profilPic={user.profilePic}
                    fullName={user.fullName}
                    username={user.username}
                    _id={user._id}
                  />
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RecommedationUser;
