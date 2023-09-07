'use client'
import {
    Button,
    Select,
    Option
} from "@material-tailwind/react";
import AvailableRoomCard from "./AvailableRoomCard";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useCallback } from 'react';
import { toTitleCase } from '../utils/formatText';

export default function AvailableRoom() {
    const dispatch = useDispatch();
    const { rooms, quantity, loading, error, roomCounter } = useSelector(state => state.availableRooms);

    const [roomType, setRoomType] = useState(null);
    const [showRooms, setShowRooms] = useState(null);
    const [totalQuantity, setTotalQuantity] = useState(null);



    useEffect(() => {
        if (Object.keys(quantity).length !== 0) {
            setRoomType(Object.keys(quantity))
        }
    }, [quantity])



    const handleRoomType = (value) => {
        setShowRooms(value)
        setTotalQuantity(quantity)
    };

    // console.log(newRoomCounter)
    return (
        <div className="p-24 m-4">

            <section className="bg-blue-gray-50 w-full h-full">
                {loading ? <div>Loading</div> : <>
                    <div className="w-72 flex flex-col items-center justify-center mx-auto py-5">
                        {roomType && <Select onChange={handleRoomType} label="Select Room Type">
                            {roomType.map((element, index) => (
                                <Option key={index} value={element}>{toTitleCase(element)}</Option>
                            ))}
                        </Select>}
                    </div>
                    <div className='grid grid-cols-12 gap-4'>
                        {rooms.length !== 0 ? <div className="col-span-7">
                            {rooms.map((element) => {
                                return showRooms === element.roomType ? <AvailableRoomCard key={element._id} room={element} totalQuantity={totalQuantity} /> : ""
                            })}
                        </div> : <div className="col-span-7 py-16">No data to show</div>}
                    </div>
                </>}
            </section >
        </div >)
}

