import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { sendMessage, deleteAlert } from '../alert/alertSlice'
import { closeModel } from '../model/modelSlice'



const initialState = {
    rooms: [],
    loading: true,
    error: false,

}

export const getRooms = createAsyncThunk(
    'getRooms',
    async () => {

        try {
            // api to get rooms
            const response = await fetch(`http://localhost:5000/api/room/getallrooms`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MzBkZmZmOWQ2NmU3OWJhMjYzNDkwIn0sImlhdCI6MTY4NzM3NzM5Mn0.TPJANmY0SDDN_Eto5hrh_vkdGwPgCgQ80noiYinwGEk"
                },
            });
            const allRooms = await response.json();
            return allRooms;
        } catch (error) {
            return error.response.json()
        }
    }
)

export const addRoom = createAsyncThunk(
    'addRoom',
    async (room, thunkAPI) => {
        try {
            // api to add Room
            const response = await fetch(`http://localhost:5000/api/room/addroom`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MzBkZmZmOWQ2NmU3OWJhMjYzNDkwIn0sImlhdCI6MTY4NzM3NzM5Mn0.TPJANmY0SDDN_Eto5hrh_vkdGwPgCgQ80noiYinwGEk"
                },
                body: JSON.stringify({
                    type: room.type, description: room.description, price: room.price,
                    capacity: room.capacity, size: room.size
                })
            });

            const roomAdd = await response.json();
            thunkAPI.dispatch(closeModel(false))
            thunkAPI.dispatch(sendMessage("room successfully added"))
            thunkAPI.dispatch(deleteAlert(null));
            return roomAdd;
        } catch (error) {
            thunkAPI.dispatch(sendMessage("Something went wrong"))
            thunkAPI.dispatch(deleteAlert(null));
            return error.response.json()
        }


    }
)

export const updateRoom = createAsyncThunk(
    'updateRoom',
    async (room, thunkAPI) => {
        try {
            // api to update Room
            const response = await fetch(`http://localhost:5000/api/room/updateroom/${room.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MzBkZmZmOWQ2NmU3OWJhMjYzNDkwIn0sImlhdCI6MTY4NzM3NzM5Mn0.TPJANmY0SDDN_Eto5hrh_vkdGwPgCgQ80noiYinwGEk"
                },
                body: JSON.stringify({
                    type: room.type, description: room.description, price: room.price,
                    capacity: room.capacity, size: room.size
                })
            });

            const roomUpdate = await response.json();
            thunkAPI.dispatch(closeModel(false))
            thunkAPI.dispatch(sendMessage("room successfully updated"))
            thunkAPI.dispatch(deleteAlert(null));
            return roomUpdate;
        } catch (error) {
            thunkAPI.dispatch(sendMessage("Something went wrong"))
            thunkAPI.dispatch(deleteAlert(null));
            return error.response.json()
        }


    }
)

export const deleteRoom = createAsyncThunk(
    'deleteRoom',
    async (id, thunkAPI) => {
        try {
            // api to delete room
            const response = await fetch(`http://localhost:5000/api/room/deleteroom/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MzBkZmZmOWQ2NmU3OWJhMjYzNDkwIn0sImlhdCI6MTY4NzM3NzM5Mn0.TPJANmY0SDDN_Eto5hrh_vkdGwPgCgQ80noiYinwGEk"
                },
            });
            const roomDelete = await response.json();
            thunkAPI.dispatch(sendMessage("room successfully deleted"))
            thunkAPI.dispatch(deleteAlert(null));
            return roomDelete;
        } catch (error) {
            thunkAPI.dispatch(sendMessage("Something went wrong"))
            thunkAPI.dispatch(deleteAlert(null));
            return error.response.json()
        }
    }
)

export const roomSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRooms.pending, (state) => {
                state.loading = true
            })
            .addCase(getRooms.fulfilled, (state, { payload }) => {
                state.loading = false
                state.rooms = payload.rooms
            })
            .addCase(getRooms.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(addRoom.pending, (state) => {
                state.loading = true
            })
            .addCase(addRoom.fulfilled, (state, { payload }) => {
                state.loading = false
                state.rooms = state.rooms.concat(payload.saveRoom)
            })
            .addCase(addRoom.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(updateRoom.pending, (state) => {
                state.loading = true
            })
            .addCase(updateRoom.fulfilled, (state, { payload }) => {
                state.loading = false
                const newRoom = state.rooms
                for (let index = 0; index < newRoom.length; index += 1) {
                    const element = newRoom[index];
                    if (element._id === payload.room._id) {
                        newRoom[index].type = payload.room.type;
                        newRoom[index].description = payload.room.description;
                        newRoom[index].price = payload.room.price;
                        newRoom[index].size = payload.room.size;
                        newRoom[index].capacity = payload.room.capacity;
                        break;
                    }
                }
                state.rooms = newRoom;
            })

            .addCase(updateRoom.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(deleteRoom.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteRoom.fulfilled, (state, { payload }) => {
                state.loading = false
                state.rooms = state.rooms.filter((room) => {
                    return room._id !== payload.room._id
                })
            })
            .addCase(deleteRoom.rejected, (state) => {
                state.loading = false
                state.error = true
            })

    },
})

export default roomSlice.reducer