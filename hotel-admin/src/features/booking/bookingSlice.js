import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'



const initialState = {
    bookings: [],
    loading: false,
    error: false
}

export const getBookings = createAsyncThunk(
    'getBookings',
    async () => {


        const response = await fetch(`http://localhost:5000/api/booking/getuserbooking`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MzBkZmZmOWQ2NmU3OWJhMjYzNDkwIn0sImlhdCI6MTY4NzM3NzM5Mn0.TPJANmY0SDDN_Eto5hrh_vkdGwPgCgQ80noiYinwGEk"
            },
        });
        const allBookings = await response.json();
        // console.log("getbooking",allBooking)
        return allBookings;

    }
)

export const bookingSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getBookings.pending]: (state) => {
            state.loading = true
        },
        [getBookings.fulfilled]: (state, { payload }) => {
           // console.log(payload.bookings)
            state.loading = payload.success
            state.bookings = payload.bookings
        },
        [getBookings.rejected]: (state,) => {
            state.loading = false
            state.error = true
        },

    },
})


export default bookingSlice.reducer