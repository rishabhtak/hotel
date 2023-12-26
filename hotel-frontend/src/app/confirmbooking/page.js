const page = async ({ searchParams }) => {
  return (
    <div className="flex items-center justify-center py-8 md:py-20">
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-y-3 px-4 text-center">
        <p className="text-lg md:text-4xl font-bold">Thank You For Booking</p>
        <p className="text-lg md:text-4xl font-bold">
          Your Booking is Confirmed. Your booking id is #{searchParams?.bookingId}
        </p>
      </div>
    </div>
  );
};

export default page;
