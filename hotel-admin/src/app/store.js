import { configureStore } from '@reduxjs/toolkit'
import BookingReducer from '../features/booking/bookingSlice'


export const store = configureStore({
    reducer: {
        bookings: BookingReducer,

    },

},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
