'use client'
import { useState } from 'react'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { format, addDays, add } from 'date-fns'


export default function Booking() {
    const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState(format(addDays(new Date(), 1), 'yyyy-MM-dd'));


    const onStartDate = (e) => {
        console.log("end date", e.target.value)
        setStartDate(e.target.value)

    }

    const onEndDate = (e) => {
        console.log("end date", e.target.value)
        setEndDate(e.target.value);
    }

    console.log(format(addDays(new Date(endDate), 365), 'yyyy-MM-dd'));
    return (
        <>
            <Breadcrumb img="/booking.jpg" pageName="booking" />
            <div className="flex flex-col items-center justify-center mx-auto">
                <div className='w-full md:w-[25rem] lg:w-[50rem] py-10 px-5 -mt-1 bg-white rounded-lg shadow-lg dark:bg-gray-800 absolute'>
                    <div className="grid lg:grid-cols-3 gap-10">
                        <div className='flex flex-col'>
                            <label htmlFor="fname">Check-in</label>
                            <input className='border px-4 py-2' type="date" id="from" name="from" value={startDate} min={startDate} max={format(addDays(new Date(), 365), 'yyyy-MM-dd')} onChange={onStartDate} />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="fname">Check-out</label>
                            <input className='border px-4 py-2' type="date" id="to" name="to" min={endDate} max={format(addDays(new Date(), 365), 'yyyy-MM-dd')} value={endDate} onChange={onEndDate} />
                        </div>
                        <button className='border bg-blue-gray-100 tracking-wide lg:mt-6'>Check Availability</button>
                    </div>
                </div>
            </div>
        </>
    )
}
