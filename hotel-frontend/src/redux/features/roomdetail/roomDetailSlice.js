import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  roomDetail: [],
  loading: true,
  error: false,
};

const host = process.env.NEXT_PUBLIC_HOST;

export const getRoomDetail = createAsyncThunk(
  "getRoomDetail",
  async (thunkAPI) => {
    try {
      // api to get room detail
      const response = await fetch(`${host}roomdetail/getroomdetail`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const allRoomDetail = await response.json();
      return allRoomDetail;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const roomDetailSlice = createSlice({
  name: "roomDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoomDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRoomDetail.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.roomDetail = payload.roomDetail;
      })
      .addCase(getRoomDetail.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default roomDetailSlice.reducer;
