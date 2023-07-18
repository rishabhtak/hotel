import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { sendMessage, deleteAlert } from '../alert/alertSlice'
import { setOpenModel } from '../model/modelSlice'

const host = process.env.REACT_APP_HOST;


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
);

export const addRoomDetail = createAsyncThunk(
    'addRoomDetail',
    async (roomDetail, thunkAPI) => {
        try {
            const formData = new FormData();
            for (let i = 0; i < roomDetail.images.length; i += 1) {
                formData.append("images", roomDetail.images[i].originFileObj);
            }
            formData.append('roomType', roomDetail.roomType);
            formData.append('features', roomDetail.features);
            formData.append('description', roomDetail.description);
            formData.append('totalRooms', roomDetail.totalRooms);


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
);

export const updateRoomDetail = createAsyncThunk(
    'updateRoomDetail',
    async (roomDetail, thunkAPI) => {
        try {
            const formData = new FormData();
            for (let i = 0; i < roomDetail.images.length; i += 1) {
                if (roomDetail.images[i].originFileObj) {

                    formData.append("images", roomDetail.images[i].originFileObj);
                }
                formData.append("images", roomDetail.images[i].key);
            }
            formData.append('roomType', roomDetail.roomType);
            formData.append('features', roomDetail.features);
            formData.append('description', roomDetail.description);
            formData.append('totalRooms', roomDetail.totalRooms);
            // api to update Room detail
            const response = await fetch(`${host}roomdetail/updateroomdetail/${roomDetail.id}`, {
                method: 'PUT',
                headers: {
                    "auth-token": localStorage.getItem('adminToken')
                },
                body: formData
            });
            thunkAPI.dispatch(setOpenModel(false))
            const roomDetailUpdate = await response.json();
            if (!roomDetailUpdate.error) {
                thunkAPI.dispatch(sendMessage({
                    message: "room detail successfully updated",
                    type: "success"
                }))
                thunkAPI.dispatch(deleteAlert());
                return roomDetailUpdate;
            }
            thunkAPI.dispatch(deleteAlert());
            return thunkAPI.rejectWithValue(updateRoomDetail.error)
        } catch (error) {
            thunkAPI.dispatch(sendMessage({
                message: "something went wrong",
                type: "error"
            }))
            thunkAPI.dispatch(deleteAlert());
            return thunkAPI.rejectWithValue(updateRoomDetail.error)
        }


    }
);

export const deleteRoomDetail = createAsyncThunk(
    'deleteRoomDetail',
    async (id, thunkAPI) => {
        try {
            // api to delete room
            const response = await fetch(`${host}roomdetail/deleteroomdetail/${id}`, {
                method: 'DELETE',
                headers: {
                    "auth-token": localStorage.getItem('adminToken')
                },
            });
            const roomDetailDelete = await response.json();
            thunkAPI.dispatch(sendMessage({
                message: "room successfully deleted",
                type: "success"
            }))
            thunkAPI.dispatch(deleteAlert());
            return roomDetailDelete;
        } catch (error) {
            thunkAPI.dispatch(sendMessage({
                message: "something went wrong",
                type: "error"
            }))
            thunkAPI.dispatch(deleteAlert());
            return thunkAPI.rejectWithValue(deleteRoomDetail.error)
        }
    }
);

const initialState = {
    roomDetail: [],
    loading: true,
    error: false,

};

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
                state.roomDetail = state.roomDetail.concat(payload.saveRoomDetail)
            })
            .addCase(addRoomDetail.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(updateRoomDetail.pending, (state) => {
                state.loading = true
            })
            .addCase(updateRoomDetail.fulfilled, (state, { payload }) => {
                state.loading = false;
                const roomIndex = state.roomDetail.findIndex(room => room._id === payload.roomDetail._id);
                if (roomIndex !== -1) {
                    state.roomDetail[roomIndex] = {
                        ...state.roomDetail[roomIndex],
                        ...payload.roomDetail
                    };
                }
            })
            .addCase(updateRoomDetail.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(deleteRoomDetail.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteRoomDetail.fulfilled, (state, { payload }) => {
                state.loading = false
                state.roomDetail = state.roomDetail.filter((room) => {
                    return room._id !== payload.roomDetail._id
                })
            })
            .addCase(deleteRoomDetail.rejected, (state) => {
                state.loading = false
                state.error = true
            })


    },
});

export default roomDetailSlice.reducer