"use client";
import { Select, Option } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import React, { useEffect, useState, useMemo } from "react";
import { toTitleCase } from "../utils/formatText";
import BookingDetails from "./BookingDetails";
import AvailableRoomCard from "./AvailableRoomCard";

export default function AvailableRoom() {
  const { rooms, quantity, loading, counter, selectedDate, flagAvailable } =
    useSelector((state) => state.availableRooms);
  const MemoizedAvailableRoomCard = useMemo(
    () => React.memo(AvailableRoomCard),
    []
  );
  const [roomType, setRoomType] = useState(null);
  const [showRooms, setShowRooms] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(null);

  useEffect(() => {
    if (Object.keys(quantity).length !== 0) {
      setRoomType(Object.keys(quantity));
    }
    if (!flagAvailable) {
      setShowRooms(null);
    }
  }, [quantity, flagAvailable]);

  const handleRoomType = (value) => {
    setShowRooms(value);
    setTotalQuantity(quantity);
  };

  return (
    <div className="mt-24 p-4 md:p-8 md:mt-0 m-4 bg-gray-100">
      <section className="container mx-auto bg-white rounded-md shadow-md p-4 md:p-8">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="flex items-center justify-center mb-4 md:mb-8 md:mt-4">
              {roomType && selectedDate && flagAvailable && (
                <Select
                  onChange={handleRoomType}
                  label="Select Room Type"
                  color="blue"
                >
                  {roomType.map((element, index) => (
                    <Option key={index} value={element}>
                      {toTitleCase(element)}
                    </Option>
                  ))}
                </Select>
              )}
            </div>
            <div className="grid grid-cols-12 gap-4">
              {rooms.length !== 0 && selectedDate && flagAvailable ? (
                <div className="col-span-12 md:col-span-7 space-y-4">
                  {rooms.map((element) => {
                    return showRooms === element.roomType ? (
                      <MemoizedAvailableRoomCard
                        key={element._id}
                        room={element}
                        totalQuantity={totalQuantity}
                      />
                    ) : null;
                  })}
                </div>
              ) : (
                <div className="col-span-12 py-8 text-center text-gray-600">
                  Please Select Date
                </div>
              )}
              {counter.length !== 0 && selectedDate && flagAvailable && (
                <BookingDetails bookingDetails={counter} />
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
