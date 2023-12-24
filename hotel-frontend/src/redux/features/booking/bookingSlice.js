import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { redirect } from "next/navigation";

const initialState = {
  bookingData: [],
  customerData: null,
  loading: false,
  error: false,
};

export const customerDetails = createAction("customerDetails");

export const createBooking = createAsyncThunk(
  "createBooking",
  async (bookingData, thunkAPI) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/booking/createbooking",
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
        console.log(res);
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
      .addCase(createBooking.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        redirect("/confirmbooking");
      })
      .addCase(createBooking.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(customerDetails, (state, action) => {
        state.customerData = action.payload;
      });
  },
});

export default bookingSlice.reducer;
