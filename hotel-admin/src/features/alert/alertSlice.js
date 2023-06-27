import { createSlice } from '@reduxjs/toolkit'

export const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        message: null,
    },
    reducers: {
        sendMessage: (state, { payload }) => {
            state.message = payload.message
        },
    },
})

export const { sendMessage } = alertSlice.actions


export const alertMessage = (state) => state.alerts.message


export default alertSlice.reducer