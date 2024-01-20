"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createBooking } from "../../redux/features/booking/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO } from "date-fns";

const BookingDetails = ({ bookingDetails }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state.auth);
  const { counter, selectedDate } = useSelector(
    (state) => state.availableRooms
  );
  const { customerData } = useSelector((state) => state.booking);
  const pathname = usePathname();
  // Calculate total price and total quantity of rooms
  const { totalPrice, totalRooms } = bookingDetails.reduce(
    (accumulator, booking) => {
      return {
        totalPrice: accumulator.totalPrice + booking.price * booking.count,
        totalRooms: accumulator.totalRooms + booking.count,
      };
    },
    { totalPrice: 0, totalRooms: 0 }
  );
  const handleBooking = async () => {
    const bookingData = {
      userId: loginData?._id,
      name: customerData?.name,
      email: customerData?.email,
      phone: customerData?.phone,
      specialRequest: customerData?.specialRequest,
      roomDetails: counter,
      startDate: new Date(selectedDate?.startDate).toISOString(),
      endDate: new Date(selectedDate?.endDate).toISOString(),
      totalPrice: totalPrice,
      totalRooms: totalRooms,
    };
    try {
      const res = await dispatch(createBooking(bookingData));
      if (res.payload.success) {
        router.push(`/confirmbooking?bookingId=${res.payload.saveBooking._id}`);
      } else {
        router.push("/bookingfailed");
      }
    } catch (error) {
      router.push("/bookingfailed");
    }
  };

  return (
    <div className="col-span-12 md:col-span-5 bg-white rounded-lg shadow-lg p-4 md:p-6 my-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Booking Details</h2>
      {bookingDetails.map((booking, index) => (
        <div
          key={index}
          className="mb-4 p-4 border-solid border-2 border-gray-300 rounded"
        >
          <p className="text-lg text-blue-500 font-bold mb-2 capitalize">
            {booking.name}
          </p>
          <p className="text-sm text-gray-600 capitalize">
            Room Type: {booking.roomType}
          </p>
          <p className="text-sm text-gray-600">Quantity: {booking.count}</p>
          <p className="text-sm text-gray-600">
            Price per Night: ₹{booking.price}
          </p>
        </div>
      ))}
      <div className="mt-4 p-4 border-solid border-2 border-gray-300 rounded">
        <p className="text-lg font-bold text-orange-200">
          Date: {format(parseISO(selectedDate.startDate), "dd-MM-yyyy")} to{" "}
          {format(parseISO(selectedDate.endDate), "dd-MM-yyyy")}
        </p>
        <p className="text-lg font-bold text-green-500">
          Total Price: ₹{totalPrice}
        </p>
        <p className="text-lg font-bold text-blue-500">
          Total Rooms: {totalRooms}
        </p>
      </div>
      <div className="mt-6">
        {pathname === "/booking" && (
          <Link
            href="/checkout"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full"
          >
            Checkout
          </Link>
        )}
        {pathname === "/checkout" && (
          <button
            onClick={handleBooking}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full"
          >
            Confirm Booking
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;
