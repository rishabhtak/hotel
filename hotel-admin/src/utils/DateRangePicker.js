import { memo, useState, useRef, useEffect } from "react";
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { format, addDays } from 'date-fns'

export default function ({inputDateHandler}) {
    const [open, setOpen] = useState(false);
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 30),
            key: 'selection'
        }
    ]);

    // get the target element to toggle 
    const refOne = useRef(null)

    useEffect(() => {
        // event listeners
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
    }, [])

    // hide dropdown on ESC press
    const hideOnEscape = (e) => {
        if (e.key === "Escape") {
            setOpen(false)
        }
    }

    // Hide on outside click
    const hideOnClickOutside = (e) => {
        if (refOne.current && !refOne.current.contains(e.target)) {
            setOpen(false)
        }
    }

    const setRangeHandler = (date) => {
        setRange([date.selection])
        inputDateHandler(date)
    }

    return (
        <div className="calendarWrap">
            <input
                value={`${format(range[0].startDate, "MM/dd/yyyy")} - ${format(range[0].endDate, "MM/dd/yyyy")}`}
                readOnly
                className="inputBox"
                onClick={() => setOpen(open => !open)}
            />
            <div ref={refOne}>
                {open &&
                    <DateRange
                        onChange={setRangeHandler}
                        editableDateInputs
                        moveRangeOnFirstSelection={false}
                        ranges={range}
                        months={1}
                        direction="horizontal"
                        className="calendarElement"
                    />
                }
            </div>
        </div>
    )
}