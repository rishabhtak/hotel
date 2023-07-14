import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { sendMessage, deleteAlert } from '../alert/alertSlice'
import { setOpenModel } from '../model/modelSlice'

const host = process.env.REACT_APP_HOST;
const initialState = {
    roomDetail: [],
    loading: true,
    error: false,

}

export const getRoomDetail = createAsyncThunk(
    'getRoomDetail',
    async (thunkAPI) => {

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
            return thunkAPI.rejectWithValue(getRoomDetail.error)
        }
    }
)

export const addRoomDetail = createAsyncThunk(
    'addRoomDetail',
    async (roomDetail, thunkAPI) => {
        //  console.log( roomDetail.images[0].originFileObj);
        try {
            const formData = new FormData();
            for (let i = 0; i < roomDetail.images.length; i+=1) {
                formData.append("images", roomDetail.images[i].originFileObj);
            }
            // formData.append('images', roomDetail.images[0].originFileObj);
            formData.append('roomType', roomDetail.roomType);
            formData.append('features', roomDetail.features);
            formData.append('description', roomDetail.description);


            // api to add Room detail
            const response = await fetch(`${host}roomdetail/addroomdetail`, {
                method: 'POST',
                headers: {
                    "auth-token": localStorage.getItem('adminToken')
                },
                body: formData
            });
            thunkAPI.dispatch(setOpenModel(false))
            const roomAddDetail = await response.json();
            console.log(roomAddDetail);
            if (!roomAddDetail.error) {
                thunkAPI.dispatch(sendMessage({
                    message: "room successfully added",
                    type: "success"
                }))
                thunkAPI.dispatch(deleteAlert());
                return roomAddDetail;
            }
            thunkAPI.dispatch(sendMessage({
                message: "something went wrong",
                type: "error"
            }))
            thunkAPI.dispatch(deleteAlert());
            return thunkAPI.rejectWithValue(addRoomDetail.error)

        } catch (error) {
            thunkAPI.dispatch(sendMessage({
                message: "something went wrong",
                type: "error"
            }))
            thunkAPI.dispatch(deleteAlert());
            return thunkAPI.rejectWithValue(addRoomDetail.error)
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
            .addCase(addRoomDetail.pending, (state) => {
                state.loading = true
            })
            .addCase(addRoomDetail.fulfilled, (state, { payload }) => {
                state.loading = false
                state.rooms = state.roomDetail.concat(payload.saveRoomDetail)
            })
            .addCase(addRoomDetail.rejected, (state) => {
                state.loading = false
                state.error = true
            })


    },
})

export default roomDetailSlice.reducer