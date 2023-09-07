'use client'
import {
    Button,
    Select,
    Option
} from "@material-tailwind/react";
import { useEffect, useState } from 'react';
import { increment, decrement } from '../../redux/features/rooms/availableRoomSlice';

import { useDispatch, useSelector } from 'react-redux';

export default function AvailableRoomCard({ room, totalQuantity }) {
    const dispatch = useDispatch();
    const [roomList, setRoomList] = useState([]);
    const [count, setCount] = useState(0);

    const { rooms, quantity, loading, error, roomCounter, counter } = useSelector(state => state.availableRooms);


    const handleAddRoomList = (room) => {
        const addRoom = [...roomList, room];
        setRoomList(addRoom)
        setCount(count + 1)
        dispatch(increment({ id: room._id, count: 1, roomType: room.roomType }));
    }

    const handleDeleteRoomList = (room) => {
        const deleteRoom = [...roomList];
        deleteRoom.pop();
        setRoomList(deleteRoom)
        setCount(count - 1)
        dispatch(decrement({ id: room._id, roomType: room.roomType }));
    }

    console.log(room)


    return (
        <div className='p-4 border-solid border-2 border-indigo-600 mt-2'>
            <h2 className='text-xl capitalize'>{room.roomType} - {room.name}</h2>
            <div className='flex items-center justify-between'>
                <div>
                    <p className='text-sm'>Room Capacity : {room.capacity}</p>
                    <p className='text-sm'>Room Rates Inclusive of Tax</p>
                    <p>Above 4+ year child will be charged as adult</p>
                </div>
                <div>
                    <p className="text-xs">
                        Price/1 Night</p>
                    <p className="text-xl font-bold"
                    >
                        &#x20b9; {room.price}</p>
                    <p className="text-xs">
                        {room.capacity === 1 ? "1 Adult" : "2 Adult"},1 Room</p>
                </div>
            </div>
            <div className="grid sm:flex justify-center md:justify-between pt-5 gap-7">
                <Button size="md" color="white" className="bg-button-color">
                    View Room
                </Button>

                <div className="flex items-center">
                    {quantity[room.roomType]} rooms left  <button disabled={0} onClick={() => handleDeleteRoomList(room)} className="px-3 bg-button-color ml-2">-</button>
                    {counter.length === 0 ? <span className="px-3 bg-white">0</span> : counter.map((value) => {
                        return room._id === value.id ? <span key={value.id} className="px-3 bg-white">{value.count}</span>:""
                    })}


                    <button disabled={quantity[room.roomType] === 0} onClick={() => handleAddRoomList(room)} className="px-3 bg-button-color">+</button>
                </div>




            </div>
            {/* <div className="flex items-center border-solid border-2 border-gray-300 mt-5 p-2">
                                        <p className="mr-1 text-sm text-green-800">Room1</p>
                                        <p className="mr-2">Adult (4+ yrs)</p>
                                        <select className="p-2" defaultValue="1">
                                            <option value="1" selected>1</option>
                                        </select>

                                    </div> */}
        </div >
    )
}

