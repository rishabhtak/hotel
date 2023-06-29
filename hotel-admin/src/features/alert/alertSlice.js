import { createSlice } from '@reduxjs/toolkit'

export const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        message: null,
    },
    reducers: {
        sendMessage: (state, { payload }) => {
            state.message = payload
        },
    },
})

export const { sendMessage } = alertSlice.actions

export const deleteAlert = (v) => (dispatch) => {

    setTimeout(() => {
        dispatch(sendMessage(v))
    }, 3000)
}

export default alertSlice.reducer