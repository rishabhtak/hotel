import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const host = process.env.REACT_APP_HOST;

const initialState = {
  users: [],
  loading: true,
  error: false,
  count: 0,
};

export const getUsers = createAsyncThunk('getUsers', async (query, thunkAPI) => {
  try {
    // api to get users
    //  const response = await fetch(`${host}admin/getallusers?page=${query.page}&limit=${query.limit}`, {
    const response = await fetch(`${host}admin/getallusers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('adminToken'),
      },
    });
    const allUsers = await response.json();
    return allUsers;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload.users;
        state.count = payload.count;
      })
      .addCase(getUsers.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default userSlice.reducer;
