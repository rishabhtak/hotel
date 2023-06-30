import { configureStore } from '@reduxjs/toolkit'
import BookingReducer from '../features/booking/bookingSlice'
import RoomReducer from '../features/room/roomSlice'
import AlertReducer from '../features/alert/alertSlice'
import ModelReducer from '../features/model/modelSlice'
import UserReducer from '../features/user/userSlice'

export const store = configureStore({
    reducer: {
        bookings: BookingReducer,
        rooms: RoomReducer,
        alerts: AlertReducer,
        setModel: ModelReducer,
        users: UserReducer

    },

},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
