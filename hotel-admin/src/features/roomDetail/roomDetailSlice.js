import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { sendMessage, deleteAlert } from '../alert/alertSlice'
// import { setOpenModel } from '../model/modelSlice'

const host = process.env.REACT_APP_HOST;
const initialState = {
    roomDetail: [],
    loading: true,
    error: false,

}

export const getRoomDetail = createAsyncThunk(
    'getRoomDetail',
    async () => {

        try {
            // api to get room detail
            const response = await fetch(`${host}roomdetail/getroomdetail`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const allRoomDetail = await response.json();
            return allRoomDetail;
        } catch (error) {
            return error.response.json()
        }
    }
)


export const roomDetailSlice = createSlice({
    name: 'roomDetail',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRoomDetail.pending, (state) => {
                state.loading = true
            })
            .addCase(getRoomDetail.fulfilled, (state, { payload }) => {
                state.loading = false
                state.roomDetail = payload.roomDetail
            })
            .addCase(getRoomDetail.rejected, (state) => {
                state.loading = false
                state.error = true
            })
         

    },
})

export default roomDetailSlice.reducer