import { configureStore } from '@reduxjs/toolkit'
import BookingReducer from '../features/booking/bookingSlice'
import RoomReducer from '../features/room/roomSlice'

export const store = configureStore({
    reducer: {
        bookings: BookingReducer,
        rooms: RoomReducer

    },

},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
