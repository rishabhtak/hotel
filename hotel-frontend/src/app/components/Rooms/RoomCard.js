'use client';
import { useEffect } from "react";
import WOW from 'wowjs';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import Image from 'next/image';

export default function RoomCard() {
    useEffect(() => {
        new WOW.WOW({
            live: false
        }).init();
    }, []);
    return (
        <section className="py-16 m-4 md:m-8 flex flex-col items-center">
            <Card className="w-full max-w-[60em] md:flex-row wow animate__animated animate__lightSpeedInLeft" data-wow-delay="0.1s">
                <CardHeader
                    shadow={false}
                    floated={false}
                    className="m-0 md:w-2/5 shrink-0 rounded-b-none md:rounded-r-none md:rounded-l-lg"
                >
                    <Image
                        src="/room-1.jpg"
                        alt="room1-image"
                        width={500}
                        height={300}
                        className="h-full w-full object-cover"
                    />
                </CardHeader>
                <CardBody className='bg-lime-50'>
                    <div className='flex items-center justify-between'>
                        <Typography variant="h6" color="blue" className="mb-4 uppercase">
                            deluxe room
                        </Typography>
                        <div>
                            <Typography className="text-xs">
                                Starting from/night
                            </Typography>
                            <Typography
                                className="flex justify-center text-xl font-bold"
                            >
                                &#x20b9; 2000*
                            </Typography>
                        </div>
                    </div>
                    <Typography className="mb-8 font-normal">
                        Enter a freshly updated and thoughtfully furnished peaceful home surrounded by ancient trees, stone walls, and open meadows.
                    </Typography>
                    <Typography variant="h6" className="capitalize">
                        features :-
                    </Typography>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 mt-2">
                        <p className="capitalize">free wifi</p>
                        <p className="capitalize">mini bar</p>
                        <p className="capitalize">Tea/Coffee maker</p>
                        <p className="capitalize">Mini Fridge</p>
                        <p className="capitalize">Safe Deposit Locker</p>

                    </div>
                    <div className="grid sm:flex justify-center md:justify-between my-5 gap-7">
                        <Button size="md" color="white" className="bg-button-color">
                            Book Now
                        </Button>
                        <Button size="md" color="white">
                            Room Details
                        </Button>
                    </div>
                </CardBody>
            </Card>
            <Card className="mt-5 w-full max-w-[60em] md:flex-row wow animate__animated animate__lightSpeedInLeft" data-wow-delay="0.3s">
                <CardHeader
                    shadow={false}
                    floated={false}
                    className="m-0 md:w-2/5 shrink-0 rounded-b-none md:rounded-r-none md:rounded-l-lg"
                >
                    <Image
                        src="/room-2.jpg"
                        alt="room2-image"
                        width={500}
                        height={300}
                        className="h-full w-full object-cover"
                    />
                </CardHeader>
                <CardBody className='bg-lime-50'>
                    <div className='flex items-center justify-between'>
                        <Typography variant="h6" color="blue" className="mb-4 uppercase">
                            super deluxe room
                        </Typography>
                        <div>
                            <Typography className="text-xs">
                                Starting from/night
                            </Typography>
                            <Typography
                                className="flex justify-center text-xl font-bold"
                            >
                                &#x20b9; 3000*
                            </Typography>
                        </div>
                    </div>
                    <Typography className="mb-8 font-normal">
                        Enter a freshly updated and thoughtfully furnished peaceful home surrounded by ancient trees, stone walls, and open meadows.
                    </Typography>
                    <Typography variant="h6" className="capitalize">
                        features :-
                    </Typography>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 mt-2">
                        <p className="capitalize">free wifi</p>
                        <p className="capitalize">mini bar</p>
                        <p className="capitalize">Tea/Coffee maker</p>
                        <p className="capitalize">Mini Fridge</p>
                        <p className="capitalize">Safe Deposit Locker</p>

                    </div>
                    <div className="grid sm:flex justify-center md:justify-between my-5 gap-7">
                        <Button size="md" color="white" className="bg-button-color">
                            Book Now
                        </Button>
                        <Button size="md" color="white">
                            Room Details
                        </Button>
                    </div>
                </CardBody>
            </Card>
            <Card className="mt-5 w-full max-w-[60em] md:flex-row wow animate__animated animate__lightSpeedInLeft" data-wow-delay="0.5s">
                <CardHeader
                    shadow={false}
                    floated={false}
                    className="m-0 md:w-2/5 shrink-0 rounded-b-none md:rounded-r-none md:rounded-l-lg"
                >
                    <Image
                        src="/room-3.jpg"
                        alt="room3-image"
                        width={500}
                        height={300}
                        className="h-full w-full object-cover"
                    />
                </CardHeader>
                <CardBody className='bg-lime-50'>
                    <div className='flex items-center justify-between'>
                        <Typography variant="h6" color="blue" className="mb-4 uppercase">
                            Executive Suite
                        </Typography>
                        <div>
                            <Typography className="text-xs">
                                Starting from/night
                            </Typography>
                            <Typography
                                className="flex justify-center text-xl font-bold"
                            >
                                &#x20b9; 5000*
                            </Typography>
                        </div>
                    </div>
                    <Typography className="mb-8 font-normal">
                        Enter a freshly updated and thoughtfully furnished peaceful home surrounded by ancient trees, stone walls, and open meadows.
                    </Typography>
                    <Typography variant="h6" className="capitalize">
                        features :-
                    </Typography>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 mt-2">
                        <p className="capitalize">free wifi</p>
                        <p className="capitalize">mini bar</p>
                        <p className="capitalize">Tea/Coffee maker</p>
                        <p className="capitalize">Mini Fridge</p>
                        <p className="capitalize">Safe Deposit Locker</p>

                    </div>
                    <div className="grid sm:flex justify-center md:justify-between my-5 gap-7">
                        <Button size="md" color="white" className="bg-button-color">
                            Book Now
                        </Button>
                        <Button size="md" color="white">
                            Room Details
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </section>
    );
}