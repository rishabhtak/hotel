import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'



const initialState = {
    bookings: [],
    bookingsByDate: [],
    loading: true,
    error: false,
}

export const getAllBookings = createAsyncThunk(
    'getAllBookings',
    async (thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:5000/api/booking/getallbookings`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('adminToken')
                },
            });
            const allBookings = await response.json();
            return allBookings;

        } catch (error) {
            return thunkAPI.rejectWithValue(getAllBookings.error)
        }
    }
)

export const getBookingsByDate = createAsyncThunk(
    'getBookingsByDate',
    async (date, thunkAPI) => {
        console.log(date)
        try {
            const response = await fetch(`http://localhost:5000/api/booking/getBookingsByDate`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('adminToken')
                },
                body: JSON.stringify({
                    from: date.startDate, to: date.endDate
                })
            });
            const bookingsByDate = await response.json();
            return bookingsByDate;

        } catch (error) {
            return thunkAPI.rejectWithValue(getBookingsByDate.error)
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
            .addCase(getAllBookings.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllBookings.fulfilled, (state, { payload }) => {
                state.loading = false
                state.bookings = payload.bookings
            })
            .addCase(getAllBookings.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(getBookingsByDate.pending, (state) => {
                state.loading = true
            })
            .addCase(getBookingsByDate.fulfilled, (state, { payload }) => {
                console.log(payload)
                state.loading = false
                state.bookingsByDate = payload.bookingsByDate
            })
            .addCase(getBookingsByDate.rejected, (state) => {
                state.loading = false
                state.error = true
            })


    },
})


export default bookingSlice.reducer