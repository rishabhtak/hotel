import { createSlice } from '@reduxjs/toolkit'

export const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        message: "",
        type: ""
    },
    reducers: {
        sendMessage: (state, { payload }) => {
            state.message = payload.message
            state.type = payload.type
        },
    },
})

export const { sendMessage } = alertSlice.actions

export const deleteAlert = () => (dispatch) => {

    setTimeout(() => {
        dispatch(sendMessage({
            message: "",
            type: ""
        }))
    }, 3000)
}

export default alertSlice.reducer