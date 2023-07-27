'use client';
import { useEffect } from "react";
import CountUp from 'react-countup';
import WOW from 'wowjs';

export default function Counter() {
    useEffect(() => {
        new WOW.WOW({
            live: false
        }).init();
    }, []);
    const counterData = [
        {
            "id": 1,
            "countup": {
                "start": 0,
                "end": 5,
            },
            "text": 'Years Of Experience',
            animationDelay: '0.1s'
        },
        {
            "id": 2,
            "countup": {
                "start": 0,
                "end": 50,
            },
            "text": 'Rooms',
            animationDelay: '0.3s'
        },
        {
            "id": 3,
            "countup": {
                "start": 0,
                "end": 100,
            },
            "text": 'Clients',
            animationDelay: '0.5s'

        }];

    return (
        <div className="container xl:max-w-7xl mx-auto px-4 py-8 lg:px-8 lg:py-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 text-center divide-y sm:divide-y-0 sm:divide-x dark:divide-gray-700/75">
                {counterData.map((element) => (
                    <dl key={element.id} className="space-y-1 px-5 py-10 wow animate__animated animate__zoomIn" data-wow-delay={element.animationDelay}>
                        <CountUp enableScrollSpy start={element.countup.start}
                            end={element.countup.end} duration={5} suffix="+" className="text-4xl font-extrabold text-black dark:text-white" />

                        <dd className="text-md uppercase tracking-wide font-semibold text-blue-600 dark:text-blue-500">
                            {element.text}
                        </dd>
                    </dl>
                ))}
            </div>
        </div>
    )
}
