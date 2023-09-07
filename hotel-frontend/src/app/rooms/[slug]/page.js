'use client';
import Breadcrumb from "@/components/layout/Breadcrumb";
import { MdMeetingRoom, MdPersonOutline } from "react-icons/md";
import RoomCarousel from "@/components/rooms/RoomCarousel";
import {
    Typography,
    Button,
} from "@material-tailwind/react";

export default function RoomDetails({ params }) {
    return (
        <>
            <Breadcrumb img="/slider1.jpg" pageName={params.slug + " Room"} />
            <section className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:pt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 pb-16">
                    <h1 className="capitalize text-5xl">{params.slug}</h1>
                    <div className="text-xl mt-2 md:flex justify-end items-center md:mt-0">
                        <div className="flex flex-row items-center">
                            <MdMeetingRoom className="text-5xl" style={{ color: '#d3a478' }} />
                            <span>11 Rooms</span>
                        </div>
                        <div className="flex flex-row items-center md:ml-5">
                            <MdPersonOutline className="text-5xl" style={{ color: '#d3a478' }} />
                            <span>Max. 3 Guest</span>
                        </div>
                    </div>
                </div>
                <RoomCarousel />
            </section>
            <div style={{
                backgroundImage: `url("/featuresBg.webp")`,
            }}
                className="pt-72 pb-24">
                <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                    <Typography className="capitalize text-white text-4xl">
                        features :-
                    </Typography>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-5 text-xl text-white capitalize">
                        <p>free wifi</p>
                        <p>mini bar</p>
                        <p className="capitalize">Tea/Coffee maker</p>
                        <p>Mini Fridge</p>
                        <p>Safe Deposit Locker</p>
                        <p>free wifi</p>
                        <p>mini bar</p>
                        <p>Tea/Coffee maker</p>
                        <p>Mini Fridge</p>
                        <p>Safe Deposit Locker</p>

                    </div>
                </div>
            </div>
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div className="col-span-2">
                        <Typography className="text-4xl">
                            World-Class Comfort!
                        </Typography>
                        <Typography className="text-justify mt-5">
                            Elegantly designed with views of the city skyline these rooms offer options of King and Twin Beds. For the comfort of families, we also have the option of interconnecting rooms. The Vesta Sleep Experience curated with plush mattresses, high quality linen and fluffy pillows will ensure every guest a good night&prime;s sleep. A working desk along with ergonomic chair, sofa and ottoman, a mini safe, a mini bar, electric kettle and other amenities ensure a complete and holistic experience. A well-equipped toilet with rain shower and classy amenities complete the room experience. A single touch telephone facility offering ensures you are only a single tough away from anything and everything you need.
                        </Typography>
                    </div>
                    <div className="mt-5 lg:mt-40 lg:ms-12">
                        <Button color="white" className="bg-button-color w-full">
                            Book Now
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

