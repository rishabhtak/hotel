import { configureStore } from "@reduxjs/toolkit";
import AvailableRoomReducer from "./features/rooms/availableRoomSlice";
import BookingReducer from "./features/booking/bookingSlice";
import AuthReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    availableRooms: AvailableRoomReducer,
    booking: BookingReducer,
    auth: AuthReducer,
  },
});
