import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'



const initialState = {
    rooms: [],
    loading: false,
    error: false
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
            return Promise.reject(error)
        }



    }
)

export const addRoom = createAsyncThunk(
    'addRoom',
    async (room) => {
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
            return roomAdd;
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }


    }
)

export const updateRoom = createAsyncThunk(
    'updateRoom',
    async (room) => {
        try {
            // api to update Room
            const response = await fetch(`http://localhost:5000/api/room/updateroom${room.id}`, {
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

            const roomUpdate = await response.json();
            return roomUpdate;
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
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
                const updateRoom = state.rooms
                for (let index = 0; index < updateRoom.length; index+=1) {
                    const element = updateRoom[index];
                    if (element._id === payload._id) {
                        updateRoom[index].type = payload.type;
                        updateRoom[index].description = payload.description;
                        updateRoom[index].price = payload.price;
                        updateRoom[index].size = payload.size;
                        updateRoom[index].capacity = payload.capacity;
                        break;
                    }
                }
                state.rooms = updateRoom;
            })
            .addCase(updateRoom.rejected, (state) => {
                state.loading = false
                state.error = true
            })

    },
})


export default roomSlice.reducer