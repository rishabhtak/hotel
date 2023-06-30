import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const host = process.env.REACT_APP_HOST;


const initialState = {
    users: [],
    loading: true,
    error: false,
    count: 0


}

export const getUsers = createAsyncThunk(
    'getUsers',
    async (query) => {

        try {
            // api to get users
            const response = await fetch(`${host}admin/getallusers?page=${query.page}&limit=${query.limit}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjY0OTM1MWZlYWQyNTEyMTkyM2M5NmY4NyJ9LCJpYXQiOjE2ODc1MzIzMTB9.sA5NxpCeAH24mxryTuUywy5jPT8grLzzD3x2Gc3Nhu4"
                },
            });
            const allUsers = await response.json();
            return allUsers;
         
        } catch (error) {
            return error.response.json()
        }
    }
)


export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(getUsers.fulfilled, (state, { payload }) => {
                state.loading = false
                state.users = payload.users
                state.count = payload.count
            })
            .addCase(getUsers.rejected, (state) => {
                state.loading = false
                state.error = true
            })
    },
})

export default userSlice.reducer