import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const ls = typeof window !== "undefined" ? window.localStorage : null;

const initialState = {
  userToken: null,
  loading: false,
  error: false,
  success: false,
  loginData: null,
  loginMessage: "",
};

const host = process.env.NEXT_PUBLIC_HOST;


export const login = createAsyncThunk(
  "login",
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch(`${host}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const login = await response.json();
      if (login.success) {
        ls.setItem("userToken", login.authToken);
        thunkAPI.dispatch(getUser());
        return login;
      }
      return thunkAPI.rejectWithValue(login);
    } catch (error) {
      return thunkAPI.rejectWithValue(login);
    }
  }
);

export const signup = createAsyncThunk(
  "signup",
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch(
        `${host}auth/createuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
            name: credentials.fullname,
            phone: credentials.phone,
          }),
        }
      );
      const res = await response.json();
      if (res.success) {
        //   console.log("sign" + JSON.stringify(res, null, 2));
        return res;
      }
      return thunkAPI.rejectWithValue(res);
    } catch (error) {
      return thunkAPI.rejectWithValue(res);
    }
  }
);

export const getUser = createAsyncThunk("getUser", async (thunkAPI) => {
  try {
    // api to get user
    const response = await fetch(`${host}auth/getuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": ls.getItem("userToken"),
      },
    });
    const login = await response.json();
    if (login.success) {
      return login;
    }
    //  ls.removeItem("userToken");
    return thunkAPI.rejectWithValue(login);
  } catch (error) {
    return thunkAPI.rejectWithValue(login);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userToken = payload.authToken;
        state.success = payload.success;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        state.loginMessage = payload.message;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = payload.success;
        state.loginMessage = payload.message;
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        state.loginMessage = payload.message;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.loginData = payload.user;
        state.success = true;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        state.loginMessage = payload.message;
      });
  },
});

export default authSlice.reducer;
