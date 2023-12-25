import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { sendMessage, deleteAlert } from '../alert/alertSlice'


const host = process.env.REACT_APP_HOST;

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
            const response = await fetch(`${host}booking/getallbookings`, {
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
            const response = await fetch(`${host}booking/getBookingsByDate`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('adminToken')
                },
                body: JSON.stringify({
                    from: date.startDate.toISOString(), to: date.endDate.toISOString()
                })
            });
            const bookingsByDate = await response.json();
            return bookingsByDate;
        } catch (error) {
            return thunkAPI.rejectWithValue(getBookingsByDate.error)
        }
    }
)

export const deleteBooking = createAsyncThunk(
    'deleteBooking',
    async (id, thunkAPI) => {
        try {
            // api to delete room
            const response = await fetch(`${host}booking/deletebooking/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('adminToken')
                },
            });
            const bookingDelete = await response.json();
            if (bookingDelete.success) {
                thunkAPI.dispatch(sendMessage({
                    message: "booking successfully deleted",
                    type: "success"
                }))
                return bookingDelete;
            }
            thunkAPI.dispatch(sendMessage({
                message: "booking not deleted",
                type: "error"
            }))
            return thunkAPI.rejectWithValue(deleteBooking.error)
        } catch (error) {
            thunkAPI.dispatch(sendMessage({
                message: "something went wrong",
                type: "error"
            }))
            return thunkAPI.rejectWithValue(deleteBooking.error)
        } finally {
            thunkAPI.dispatch(deleteAlert());
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
                state.loading = false
                state.bookingsByDate = payload.bookingsByDate
            })
            .addCase(getBookingsByDate.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(deleteBooking.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteBooking.fulfilled, (state, { payload }) => {
                state.loading = false
                state.bookings = state.bookings.filter((booking) => {
                    return booking._id !== payload.booking._id
                })
            })
            .addCase(deleteBooking.rejected, (state) => {
                state.loading = false
                state.error = true
            })


    },
})


export default bookingSlice.reducer