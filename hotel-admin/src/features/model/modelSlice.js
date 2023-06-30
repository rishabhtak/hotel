import { createSlice } from '@reduxjs/toolkit'

export const modelSlice = createSlice({
    name: 'model',
    initialState: {
        modelOpen: false,
        dialogOpen: false,
    },
    reducers: {
        setOpenModel: (state, { payload }) => {
            state.modelOpen = payload
        },
        setDialogOpen: (state, { payload }) => {
            state.dialogOpen = payload
        },
    },
})

export const { setOpenModel, setDialogOpen } = modelSlice.actions

export default modelSlice.reducer