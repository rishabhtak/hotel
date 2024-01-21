import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  roomTypeDetail: [],
  loading: true,
  error: false,
};

const host = process.env.NEXT_PUBLIC_HOST;

export const getRoomTypeDetail = createAsyncThunk(
  "getRoomTypeDetail",
  async (roomTypeToFind, thunkAPI) => {
    try {
      // api to get rooms
      const response = await fetch(`${host}roomdetail/getRoomTypeDetail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomTypeToFind }),
      });
      const roomTypeDetail = await response.json();
      return roomTypeDetail;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const roomTypeDetailSlice = createSlice({
  name: "roomTypeDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoomTypeDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRoomTypeDetail.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.roomTypeDetail = payload.roomTypeDetail;
      })
      .addCase(getRoomTypeDetail.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default roomTypeDetailSlice.reducer;
