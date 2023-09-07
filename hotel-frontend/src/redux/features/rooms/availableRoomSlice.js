import { createSlice, createAsyncThunk, current, createAction } from '@reduxjs/toolkit'

const initialState = {
    rooms: [],
    quantity: {},
    roomCounter: {},
    counter: [],
    loading: false,
    error: false,
}

export const increment = createAction('increment')
export const decrement = createAction('decrement')



export const getAvailableRooms = createAsyncThunk(
    'getAvailableRooms',
    async (data, thunkAPI) => {
        try {
            // api to get rooms
            const response = await fetch(`http://localhost:5000/api/room/getavailableroom`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    from: data.startDate, to: data.endDate
                })
            });
            const availableRooms = await response.json();
            return availableRooms;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const availableRoomSlice = createSlice({
    name: 'availableRooms',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAvailableRooms.pending, (state) => {
                state.loading = true
            })
            .addCase(getAvailableRooms.fulfilled, (state, { payload }) => {
                state.loading = false
                state.rooms = payload.rooms
                state.quantity = payload.quantity
                Object.keys(payload.quantity).forEach(function (key, value) {
                    return state.roomCounter[key] = 0;
                })
            })
            .addCase(getAvailableRooms.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(increment, (state, action) => {
                console.log(action.payload)
                state.quantity[action.payload.roomType] -= 1
                state.roomCounter[action.payload.roomType] += 1
                const roomIndex = state.counter.findIndex(room => room.id === action.payload.id);
                if (roomIndex !== -1) {
                    state.counter[roomIndex] = {
                        ...state.counter[roomIndex],
                        count: state.counter[roomIndex].count + 1
                    };
                }
                else {
                    state.counter.push(action.payload);
                }
            })
            .addCase(decrement, (state, action) => {
                state.quantity[action.payload.roomType] += 1
                state.roomCounter[action.payload.roomType] -= 1
                const roomIndex = state.counter.findIndex(room => room.id === action.payload.id);
                if (roomIndex !== -1) {
                    state.counter[roomIndex] = {
                        ...state.counter[roomIndex],
                        count: state.counter[roomIndex].count - 1
                    };
                }
            })
    },
})

export default availableRoomSlice.reducer