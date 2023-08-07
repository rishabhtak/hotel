'use client';
import { useEffect } from "react";
import {
    Button,
} from "@material-tailwind/react";
import WOW from 'wowjs';

export default function ServiceCard() {
    useEffect(() => {
        new WOW.WOW({
            live: false
        }).init();
    }, []);
    const serviceCardData = [
        {
            id: 1,
            img: '/gym.webp',
            text: 'gym',
            animationDelay: '0.1s'
        },
        {
            id: 2,
            img: '/restaurant.webp',
            text: 'restaurant',
            animationDelay: '0.3s'
        },
        {
            id: 3,
            img: '/swimming.jpeg',
            text: 'swimming pool',
            animationDelay: '0.5s'
        },

    ];
    return (
        <div className="container px-6 py-16 mx-auto">
            <h2 className="font-semibold text-center capitalize text-3xl sm:text-5xl">Experience Our <span className="text-blueText-color">Services</span>
            </h2>
            <div className="grid grid-cols-1 gap-8 mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
                {serviceCardData.map((element) => (
                    <div key={element.id} className="overflow-hidden bg-cover bg-center rounded-lg cursor-pointer h-96 group wow animate__animated animate__fadeInUp" data-wow-delay={element.animationDelay} style={{ backgroundImage: `url(${element.img})` }}>
                        <div className="flex flex-col justify-center w-full h-full px-8 py-4 transition-opacity duration-700 opacity-0 bg-gray-800/60 group-hover:opacity-100">
                            <h2 className="mt-4 text-xl font-semibold text-white capitalize text-center">{element.text}</h2>
                            <Button size="md" color="white" className='mt-4'>
                                View More Services
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
