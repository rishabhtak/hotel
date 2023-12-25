import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendMessage, deleteAlert } from '../alert/alertSlice';
import { setOpenModel } from '../model/modelSlice';

const host = process.env.REACT_APP_HOST;
const initialState = {
  rooms: [],
  loading: true,
  error: false,
  count: 0,
};

export const getRooms = createAsyncThunk('getRooms', async (query, thunkAPI) => {
  try {
    // api to get rooms
    // const response = await fetch(`${host}room/getallrooms?page=${query.page}&limit=${query.limit}`, {
    const response = await fetch(`${host}room/getallrooms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('adminToken'),
      },
    });
    const allRooms = await response.json();
    return allRooms;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addRoom = createAsyncThunk('addRoom', async (room, thunkAPI) => {
  try {
    // api to add Room
    const response = await fetch(`${host}room/addroom`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('adminToken'),
      },
      body: JSON.stringify({
        roomType: room.roomType,
        description: room.description,
        price: room.price,
        capacity: room.capacity,
        name: room.name,
      }),
    });
    thunkAPI.dispatch(setOpenModel(false));
    const roomAdd = await response.json();
    if (roomAdd.success) {
      thunkAPI.dispatch(
        sendMessage({
          message: 'room successfully added',
          type: 'success',
        })
      );
      return roomAdd;
    }
    thunkAPI.dispatch(
      sendMessage({
        message: 'something went wrong',
        type: 'error',
      })
    );
    return thunkAPI.rejectWithValue(addRoom.error);
  } catch (error) {
    thunkAPI.dispatch(
      sendMessage({
        message: 'something went wrong',
        type: 'error',
      })
    );
    return thunkAPI.rejectWithValue(error);
  } finally {
    thunkAPI.dispatch(deleteAlert());
  }
});

export const updateRoom = createAsyncThunk('updateRoom', async (room, thunkAPI) => {
  try {
    // api to update Room
    const response = await fetch(`${host}room/updateroom/${room.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('adminToken'),
      },
      body: JSON.stringify({
        roomType: room.roomType,
        description: room.description,
        price: room.price,
        capacity: room.capacity,
        name: room.name,
      }),
    });
    thunkAPI.dispatch(setOpenModel(false));
    const roomUpdate = await response.json();
    if (roomUpdate.success) {
      thunkAPI.dispatch(
        sendMessage({
          message: 'room successfully updated',
          type: 'success',
        })
      );
      return roomUpdate;
    }
    thunkAPI.dispatch(
      sendMessage({
        message: 'something went wrong',
        type: 'error',
      })
    );
    return thunkAPI.rejectWithValue(updateRoom.error);
  } catch (error) {
    thunkAPI.dispatch(
      sendMessage({
        message: 'something went wrong',
        type: 'error',
      })
    );
    return thunkAPI.rejectWithValue(error);
  } finally {
    thunkAPI.dispatch(deleteAlert());
  }
});

export const deleteRoom = createAsyncThunk('deleteRoom', async (id, thunkAPI) => {
  try {
    // api to delete room
    const response = await fetch(`${host}room/deleteroom/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('adminToken'),
      },
    });
    const roomDelete = await response.json();
    if (roomDelete.success) {
      thunkAPI.dispatch(
        sendMessage({
          message: 'room successfully deleted',
          type: 'success',
        })
      );
      return roomDelete;
    }
    thunkAPI.dispatch(
      sendMessage({
        message: 'room not found',
        type: 'error',
      })
    );
    return thunkAPI.rejectWithValue(deleteRoom.error);
  } catch (error) {
    thunkAPI.dispatch(
      sendMessage({
        message: 'something went wrong',
        type: 'error',
      })
    );
    return thunkAPI.rejectWithValue(deleteRoom.error);
  } finally {
    thunkAPI.dispatch(deleteAlert());
  }
});

export const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRooms.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.rooms = payload.rooms;
        state.count = payload.count;
      })
      .addCase(getRooms.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRoom.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.rooms = state.rooms.concat(payload.saveRoom);
        state.count += 1;
      })
      .addCase(addRoom.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRoom.fulfilled, (state, { payload }) => {
        state.loading = false;
        const roomIndex = state.rooms.findIndex((room) => room._id === payload.room._id);
        if (roomIndex !== -1) {
          state.rooms[roomIndex] = {
            ...state.rooms[roomIndex],
            ...payload.room,
          };
        }
      })
      .addCase(updateRoom.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRoom.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.rooms = state.rooms.filter((room) => {
          return room._id !== payload.room._id;
        });
        state.count -= 1;
      })
      .addCase(deleteRoom.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default roomSlice.reducer;
