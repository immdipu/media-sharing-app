import React from "react";
import clsx from "clsx";

const RoomUpdateCard = ({
  message = " ",
  updatedBy = "",
}: {
  message: string;
  updatedBy: string;
}) => {
  return (
    <div className=" mx-3 my-2 flex min-h-[3rem] flex-col rounded-md border border-primary-color bg-Third-background px-3 py-2  hover:bg-secondary-hover">
      {/* <div className="ml-3">
        <FaBell className="text-2xl text-green-200" />
      </div> */}
      <div>
        <p className="font-poppins text-sm leading-none text-Paragraph-primary">
          Notification
        </p>
      </div>
      <div className=" mt-1 w-full">
        <p
          className={clsx(
            "font-poppins text-[13px] text-green-600",
            message.includes("kicked") ? "text-red-600" : "text-green-600",
          )}
        >
          {message}{" "}
          <span className="font-medium text-paragraph-secondary">
            {updatedBy}
          </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default RoomUpdateCard;
