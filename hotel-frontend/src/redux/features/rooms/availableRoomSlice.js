import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
  flagAvailable: false,
  quantity: {},
  roomCounter: {},
  counter: [],
  selectedDate: null,
  loading: false,
  error: false,
};

const host = process.env.NEXT_PUBLIC_HOST;


export const increment = createAction("increment");
export const decrement = createAction("decrement");
export const updateDate = createAction("updateDate");
export const updateFlag = createAction("updateFlag");

export const getAvailableRooms = createAsyncThunk(
  "getAvailableRooms",
  async (data, thunkAPI) => {
    try {
      // api to get rooms
      const response = await fetch(
        `${host}room/getavailableroom`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: data.startDate,
            to: data.endDate,
          }),
        }
      );
      const availableRooms = await response.json();
      return availableRooms;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const availableRoomSlice = createSlice({
  name: "availableRooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAvailableRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAvailableRooms.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.rooms = payload.rooms;
        state.quantity = payload.quantity;
        Object.keys(payload.quantity).forEach(function (key, value) {
          return (state.roomCounter[key] = 0);
        });
      })
      .addCase(getAvailableRooms.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(increment, (state, action) => {
        state.quantity[action.payload.roomType] -= 1;
        state.roomCounter[action.payload.roomType] += 1;
        const roomIndex = state.counter.findIndex(
          (room) => room.id === action.payload.id
        );
        if (roomIndex !== -1) {
          state.counter[roomIndex] = {
            ...state.counter[roomIndex],
            count: state.counter[roomIndex].count + 1,
          };
        } else {
          state.counter.push(action.payload);
        }
      })
      .addCase(decrement, (state, action) => {
        state.quantity[action.payload.roomType] += 1;
        state.roomCounter[action.payload.roomType] -= 1;

        // Find the index of the room in the counter array
        const roomIndex = state.counter.findIndex(
          (room) => room.id === action.payload.id
        );

        if (roomIndex !== -1) {
          // If count becomes 0, remove the object from the counter array
          if (state.counter[roomIndex].count === 1) {
            state.counter.splice(roomIndex, 1);
          } else {
            state.counter[roomIndex] = {
              ...state.counter[roomIndex],
              count: state.counter[roomIndex].count - 1,
            };
          }
        }
      })
      .addCase(updateDate, (state, action) => {
        if (action.payload.startDate === null) {
          state.selectedDate = null;
          state.counter = [];
          state.roomCounter = {};
          state.quantity = {};
        } else {
          state.selectedDate = action.payload;
          state.counter = [];
          state.roomCounter = {};
          state.quantity = {};
        }
      })
      .addCase(updateFlag, (state, action) => {
        state.flagAvailable = action.payload;
      });
  },
});

export default availableRoomSlice.reducer;
