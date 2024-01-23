import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

const ls = typeof window !== "undefined" ? window.localStorage : null;

const initialState = {
  userBookings: [],
  customerData: null,
  loading: false,
  error: false,
};

const host = process.env.NEXT_PUBLIC_HOST;


export const customerDetails = createAction("customerDetails");

export const createBooking = createAsyncThunk(
  "createBooking",
  async (bookingData, thunkAPI) => {
    try {
      const response = await fetch(
        `${host}booking/createbooking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            userId: bookingData.userId,
          },
          body: JSON.stringify({
            name: bookingData.name,
            email: bookingData.email,
            phone: bookingData.phone,
            specialRequest: bookingData.specialRequest,
            roomDetails: bookingData.roomDetails,
            startDate: bookingData.startDate,
            endDate: bookingData.endDate,
            totalPrice: bookingData.totalPrice,
            totalRooms: bookingData.totalRooms,
          }),
        }
      );
      const res = await response.json();
      if (res.success) {
        return res;
      }
      return thunkAPI.rejectWithValue(res);
    } catch (error) {
      return thunkAPI.rejectWithValue(res);
    }
  }
);

export const getUserBookings = createAsyncThunk(
  "getUserBookings",
  async (thunkAPI) => {
    try {
      // api to get user's bookings
      const response = await fetch(
        `${host}booking/getuserbooking`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": ls?.getItem("userToken"),
          },
        }
      );
      const res = await response.json();
      if (res.success) {
        return res;
      }
      return thunkAPI.rejectWithValue(res);
    } catch (error) {
      return thunkAPI.rejectWithValue(res);
    }
  }
);

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBooking.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createBooking.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(customerDetails, (state, { payload }) => {
        state.customerData = payload;
      })
      .addCase(getUserBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserBookings.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.userBookings = payload.bookings;
      })
      .addCase(getUserBookings.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default bookingSlice.reducer;
