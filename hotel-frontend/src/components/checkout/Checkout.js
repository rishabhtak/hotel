"use client";
import CustomerDetailsForm from "../../components/checkout/CustomerDetailsForm";
import BookingDetails from "../../components/booking/BookingDetails";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

const Checkout = () => {
  const { counter, selectedDate } = useSelector(
    (state) => state.availableRooms
  );

  if (selectedDate === null) {
    return redirect("/");
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-7 space-y-4">
        <CustomerDetailsForm />
      </div>
      <BookingDetails bookingDetails={counter} />
    </div>
  );
};

export default Checkout;
