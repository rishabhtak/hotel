"use client";
// Import necessary dependencies and styles
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import {
  increment,
  decrement,
} from "../../redux/features/rooms/availableRoomSlice";
import { useDispatch, useSelector } from "react-redux";

export default function AvailableRoomCard({ room }) {
  const dispatch = useDispatch();
  const [roomList, setRoomList] = useState([]);
  const [count, setCount] = useState(0);

  const { quantity, loading, error, counter } = useSelector(
    (state) => state.availableRooms
  );

  const handleAddRoomList = (room) => {
    const addRoom = [...roomList, room];
    setRoomList(addRoom);
    setCount(count + 1);
    dispatch(
      increment({
        id: room._id,
        count: 1,
        roomType: room.roomType,
        name: room.name,
        price: room.price,
      })
    );
  };

  const handleDeleteRoomList = (room) => {
    const deleteRoom = [...roomList];
    deleteRoom.pop();
    setRoomList(deleteRoom);
    setCount(count - 1);
    dispatch(decrement({ id: room._id, roomType: room.roomType }));
  };

  if (loading) {
    return (
      <div className="p-4 border-solid border-2 border-indigo-600 mt-2">
        Loading....
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border-solid border-2 border-indigo-600 mt-2">
        Sorry room can&apos;t be loaded, Please try again later
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 border-solid border-2 border-indigo-600 mt-2">
      <h2 className="text-lg md:text-xl capitalize mb-2">
        {room.roomType} - {room.name}
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-2 md:mb-0">
          <p className="text-xs md:text-sm">Room Capacity: {room.capacity}</p>
          <p className="text-xs md:text-sm">Room Rates Inclusive of Tax</p>
          <p className="text-xs md:text-sm">
            Above 4+ year child will be charged as adult
          </p>
        </div>
        <div>
          <p className="text-xs">Price/1 Night</p>
          <p className="text-base md:text-xl font-bold">
            &#x20b9; {room.price}
          </p>
          <p className="text-xs md:text-sm">
            {room.capacity === 1 ? "1 Adult" : "2 Adult"}, 1 Room
          </p>
        </div>
      </div>
      <div className="grid sm:flex justify-center md:justify-between pt-4 md:pt-5 gap-4 md:gap-7">
        <Button size="sm" color="white" className="bg-button-color">
          View Room
        </Button>

        <div className="flex items-center">
          {quantity[room.roomType]} rooms left
          <button
            disabled={count === 0}
            onClick={() => handleDeleteRoomList(room)}
            className="px-2 md:px-3 ml-1 bg-button-color"
          >
            -
          </button>
          {/* Check if count is available in the counter array for the specific room */}
          {counter.find((value) => value.id === room._id) ? (
            counter.map((value) =>
              room._id === value.id ? (
                <span
                  key={value.id}
                  className="px-2 md:px-3 bg-white text-xs md:text-base"
                >
                  {value.count}
                </span>
              ) : null
            )
          ) : (
            <span className="px-2 md:px-3 bg-white text-xs md:text-base">
              0
            </span>
          )}
          <button
            disabled={quantity[room.roomType] === 0}
            onClick={() => handleAddRoomList(room)}
            className="px-2 md:px-3 bg-button-color"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
