"use client";
import CustomerDetailsForm from "@/components/checkout/CustomerDetailsForm";
import BookingDetails from "@/components/booking/BookingDetails";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useMemo } from "react";

const Checkout = () => {

  const {
    rooms,
    quantity,
    loading,
    error,
    roomCounter,
    counter,
    selectedDate,
  } = useSelector((state) => state.availableRooms);

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
