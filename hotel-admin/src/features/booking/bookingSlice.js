import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'



const initialState = {
    bookings: [],
    loading: true,
    error: false,
}

export const getBookings = createAsyncThunk(
    'getBookings',
    async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/getallbookings`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('adminToken')
                },
            });
            const allBookings = await response.json();
            return allBookings;

        } catch (error) {
            return error.response.json()
        }
    }
)

export const bookingSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getBookings.pending, (state) => {
                state.loading = true
            })
            .addCase(getBookings.fulfilled, (state, { payload }) => {
                state.loading = false
                state.bookings = payload.bookings
            })
            .addCase(getBookings.rejected, (state) => {
                state.loading = false
                state.error = true
            })

    },
})


export default bookingSlice.reducer