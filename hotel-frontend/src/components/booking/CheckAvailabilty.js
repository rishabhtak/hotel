"use client";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { useDispatch } from "react-redux";
import {
  getAvailableRooms,
  updateDate,
  updateFlag,
} from "@/redux/features/rooms/availableRoomSlice";
import { addDays, format, isAfter } from "date-fns";

export default function CheckAvailabilty() {
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleValueChange = (newValue) => {
    if (isAfter(new Date(newValue.endDate), new Date(newValue.startDate))) {
      setValue(newValue);
      dispatch(updateFlag(false));
      setButtonDisabled(true);
    } else {
      newValue.endDate = format(
        addDays(new Date(newValue.endDate), 1),
        "yyyy-MM-dd"
      );
      setValue(newValue);
      dispatch(updateFlag(false));
      setButtonDisabled(true);
    }
  };

  const handleAvailabilityChange = () => {
    dispatch(getAvailableRooms(value));
    dispatch(updateDate(value));
    dispatch(updateFlag(true));
    setValue({
      startDate: null,
      endDate: null,
    });
    setButtonDisabled(false);
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto">
      <div className="w-full md:w-[40rem] lg:w-[50rem] py-5 lg:py-10 px-5 -mt-1 bg-white rounded-lg shadow-lg dark:bg-gray-800 absolute">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="flex flex-col">
            <label htmlFor="fname" className="ml-2 font-bold">
              Check-in / Check-out
            </label>
            <Datepicker
              inputClassName="w-full rounded-lg font-normal border py-2 px-2"
              value={value}
              onChange={handleValueChange}
              readOnly={true}
              minDate={new Date()}
            />
          </div>
          <button
            disabled={!buttonDisabled}
            onClick={handleAvailabilityChange}
            className={`w-full px-6 py-2.5 text-lg font-medium tracking-wider transition-colors duration-300 transform md:w-auto md:mx-6 focus:outline-none ${
              buttonDisabled
                ? "bg-button-color text-white"
                : "bg-blue-gray-50 text-black cursor-not-allowed"
            } rounded-lg focus:ring focus:ring-gray-300 focus:ring-opacity-80`}
          >
            Check Availability
          </button>
        </div>
      </div>
    </div>
  );
}
