import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { sendMessage, deleteAlert } from '../alert/alertSlice'


const host = process.env.REACT_APP_HOST;

const initialState = {
    userToken: null,
    loading: false,
    error: false
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
                return adminLogin;
            }
            console.log(adminLogin.authToken);
            thunkAPI.dispatch(sendMessage({
                message: "invalid credentials",
                type: "error"
            }))
            thunkAPI.dispatch(deleteAlert());
            return adminLogin
        } catch (error) {
            console.error(error)
            thunkAPI.dispatch(sendMessage({
                message: "something went wrong,Please try again later",
                type: "error"
            }))
            thunkAPI.dispatch(deleteAlert());
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
                console.log(payload)
                state.loading = false
                //  state.userToken = payload.authToken
                // localStorage.setItem('adminToken', payload.authToken);
            })
            .addCase(login.rejected, (state) => {
                state.loading = false
                state.error = true
            })

    },
    // [logout.fulfilled]: (state, { payload }) => {
    //      state.userToken = null
    //      localStorage.removeItem('token');
    //  },
    // [logout.rejected]: (state) => {
    //      state.userToken = null
    //      localStorage.removeItem('token');
    //  }
})


export default authSlice.reducer
