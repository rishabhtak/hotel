import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { sendMessage, deleteAlert } from '../alert/alertSlice'

const host = process.env.REACT_APP_HOST;

const getAdminfromLocalStorage = localStorage.getItem('adminToken')
    ? localStorage.getItem('adminToken')
    : null;

const initialState = {
    adminToken: getAdminfromLocalStorage,
    loading: false,
    error: false,
    success: false,
    admin: {}
}

export const login = createAsyncThunk(
    'login',
    async (credentials, thunkAPI) => {
        try {
            const response = await fetch(`${host}admin/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            const adminLogin = await response.json();
            if (adminLogin.success) {
                localStorage.setItem('adminToken', adminLogin.authToken);
                thunkAPI.dispatch(getAdmin())
                return adminLogin;
            }
            thunkAPI.dispatch(sendMessage({
                message: "invalid credentials",
                type: "error"
            }))
            thunkAPI.dispatch(deleteAlert());
            return thunkAPI.rejectWithValue(adminLogin.error)
        } catch (error) {
            thunkAPI.dispatch(sendMessage({
                message: "something went wrong,Please try again later",
                type: "error"
            }))
            thunkAPI.dispatch(deleteAlert());
            return error.response.json()
        }

    }
)

export const getAdmin = createAsyncThunk(
    'getAdmin',
    async () => {

        try {
            // api to get users
            const response = await fetch(`${host}admin/getadmin`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('adminToken')
                },
            });
            const admin = await response.json();
            return admin;
        } catch (error) {
            return error.response.json()
        }
    }
)


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.loading = false
                state.adminToken = payload.authToken
                state.success = payload.success
            })
            .addCase(login.rejected, (state) => {
                state.loading = false
                state.error = true
                state.success = false
            })
            .addCase(getAdmin.pending, (state) => {
                state.loading = true
            })
            .addCase(getAdmin.fulfilled, (state, { payload }) => {
                state.loading = false
                state.admin = payload.admin
            })
            .addCase(getAdmin.rejected, (state) => {
                state.loading = false
                state.error = true
            })

    },
})


export default authSlice.reducer
