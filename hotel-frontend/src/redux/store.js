import { configureStore } from '@reduxjs/toolkit'
import AvailableRoomReducer from './features/rooms/availableRoomSlice'

export const store = configureStore({
    reducer: {
        availableRooms: AvailableRoomReducer,

    },

})