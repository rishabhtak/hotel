import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'



const initialState = {
    booking: [],
    loading: false,
    error: false
}

export const getBooking = createAsyncThunk(
    'getBooking',
    async () => {

        const response = await fetch(`http://localhost:5000/api/booking/getuserbooking`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MzBkZmZmOWQ2NmU3OWJhMjYzNDkwIn0sImlhdCI6MTY4NzM3NzM5Mn0.TPJANmY0SDDN_Eto5hrh_vkdGwPgCgQ80noiYinwGEk"
            },
        });
        const allBooking = await response.json();
        return allBooking;

    }
)

export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getBooking.pending]: (state) => {
            state.loading = true
        },
        [getBooking.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.booking = payload
        },
        [getBooking.rejected]: (state,) => {
            state.loading = false
            state.error = true
        },
       
    },
})


export default bookingSlice.reducer