import { createSlice } from '@reduxjs/toolkit'

export const modelSlice = createSlice({
    name: 'model',
    initialState: {
        modelOpen: false,
    },
    reducers: {
        openModel: (state, { payload }) => {
            state.modelOpen = payload
        },
        closeModel: (state, { payload }) => {
            state.modelOpen = payload
        },
    },
})

export const { openModel, closeModel } = modelSlice.actions

export default modelSlice.reducer