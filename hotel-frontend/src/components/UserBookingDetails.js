"use client";
import {  useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserBookings } from "../redux/features/booking/bookingSlice";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { redirect } from "next/navigation";

const UserBookingDetails = () => {
  const { userBookings } = useSelector((state) => state.booking);

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    redirect("/");
  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      dispatch(getUserBookings());
    } else {
      redirect("/login");
    }
  }, []);

  if (userBookings.length <= 0) {
    return (
      <>
        <Link
          className="inline-block px-4 py-2 mt-6 mr-5 bg-red-500 text-white text-center float-right rounded-md transition duration-300 hover:bg-red-600"
          href="/"
          onClick={handleLogout}
        >
          Logout
        </Link>
        <div className="h-screen pt-20 text-center">
          <div>Your Bookings is empty</div>
          <Link
            href="/"
            className="inline-block px-4 py-2 mt-6 bg-blue-500 text-white text-center rounded-md transition duration-300 hover:bg-blue-600"
          >
            Book Your Room
          </Link>
        </div>
      </>
    );
  }
  return (
    <div>
      <Link
        className="inline-block px-4 py-2 mt-6 mr-5 bg-red-500 text-white text-center rounded-md transition duration-300 hover:bg-red-600"
        href="/"
        onClick={handleLogout}
      >
        Logout
      </Link>
      {userBookings &&
        userBookings.map((booking) => (
          <div key={booking._id}>
            <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="text-xl sm:text-2xl my-3 sm:my-5 font-bold tracking-tight text-gray-900">
                  Booking # {booking._id}
                </div>
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {booking.roomDetails.map((roomDetail, index) => (
                      <li
                        key={index}
                        className="flex flex-col py-6 sm:flex-row"
                      >
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <Link href="#">
                                <h1 className="capitalize">
                                  {roomDetail.name}
                                </h1>
                              </Link>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 capitalize">
                              {roomDetail.roomType}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty: {roomDetail.count}
                              </label>
                            </div>

                            <div className="flex flex-col">
                              <p>Price: ₹{roomDetail.price}/ 1 Night</p>
                              <p>
                                Subtotal: {roomDetail.price * roomDetail.count}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex flex-col my-2 text-base font-medium text-gray-900">
                  <p>
                    Booking from:{" "}
                    {format(parseISO(booking.startDate), "dd-MM-yyyy")} to{" "}
                    {format(parseISO(booking.endDate), "dd-MM-yyyy")}
                  </p>
                  <p>Total Price: ₹{booking.totalPrice}</p>
                  <p>Total Rooms: {booking.totalRooms}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Customer Details:
                </p>
                <div className="flex flex-col gap-2 px-4 sm:px-6 py-4 sm:py-6 border-solid border-2 border-gray-200">
                  <p className="text-base sm:text-sm font-semibold leading-6 text-gray-900 capitalize">
                    {booking.name}
                  </p>

                  <p className="text-xs sm:text-sm leading-5 text-gray-500">
                    {booking.email}
                  </p>
                  <div className="sm:flex sm:items-end">
                    <p className="text-base sm:text-sm leading-6 text-gray-900">
                      Phone: {booking.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserBookingDetails;
