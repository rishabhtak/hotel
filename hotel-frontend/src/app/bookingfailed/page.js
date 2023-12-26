import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center py-8 md:py-20">
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-y-3 px-4 text-center">
        <p className="text-lg md:text-4xl font-bold">
          Sorry your booking is not confirmed, There is something wrong with
          your booking.
        </p>
      </div>
    </div>
  );
};

export default page;
