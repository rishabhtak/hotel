'use client';
import { useEffect } from "react";
import { MdFastfood, MdLocalLaundryService, MdWifi, MdTv, MdRestaurant, MdPool, MdLocalParking, MdRoomService } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import WOW from 'wowjs';

function ServicesCard() {
    useEffect(() => {
        new WOW.WOW({
            live: false
        }).init();
    }, []);
    return (
        <section className="py-16 m-4 md:m-8">
            <div className="container mx-auto p-4 my-6 space-y-2 text-center">
                <h2 className="text-5xl font-bold">Hotel Services</h2>
            </div>
            <div className="container mx-auto grid justify-center sm:grid-cols-2 lg:grid-cols-3 py-10">
                <div className="flex flex-col items-center p-10 hover:shadow-2xl transition ease-in-out delay-150 hover:-translate-y-6 hover:scale-110 duration-300 wow animate__animated animate__zoomIn" data-wow-delay="0.1s">
                    <MdFastfood className='text-5xl' style={{ color: '#ffac41' }} />
                    <h3 className="my-5 text-3xl">Free Breakfast</h3>
                </div>
                <div className="flex flex-col items-center p-10 hover:shadow-2xl transition ease-in-out delay-150 hover:-translate-y-6 hover:scale-105 duration-300 wow animate__animated animate__zoomIn" data-wow-delay="0.3s">
                    <MdLocalLaundryService className='text-5xl' style={{ color: '#ffac41' }} />
                    <h3 className="my-5 text-3xl">Laundry</h3>
                </div>
                <div className="flex flex-col items-center p-10 hover:shadow-2xl transition ease-in-out delay-150 hover:-translate-y-6 hover:scale-105 duration-300 wow animate__animated animate__zoomIn" data-wow-delay="0.5s">
                    <MdWifi className='text-5xl' style={{ color: '#ffac41' }} />
                    <h3 className="my-5 text-3xl">Free Wifi</h3>
                </div>
                <div className="flex flex-col items-center p-10 hover:shadow-2xl transition ease-in-out delay-150 hover:-translate-y-6 hover:scale-105 duration-300 wow animate__animated animate__zoomIn" data-wow-delay="0.1s">
                    <MdTv className='text-5xl' style={{ color: '#ffac41' }} />
                    <h3 className="my-5 text-3xl">LED TV</h3>
                </div>
                <div className="flex flex-col items-center p-10 hover:shadow-2xl transition ease-in-out delay-150 hover:-translate-y-6 hover:scale-105 duration-300 wow animate__animated animate__zoomIn" data-wow-delay="0.3s">
                    <CgGym className='text-5xl' style={{ color: '#ffac41' }} />
                    <h3 className="my-5 text-3xl">Gym</h3>
                </div>
                <div className="flex flex-col items-center p-10 hover:shadow-2xl transition ease-in-out delay-150 hover:-translate-y-6 hover:scale-105 duration-300 wow animate__animated animate__zoomIn" data-wow-delay="0.5s">
                    <MdRestaurant className='text-5xl' style={{ color: '#ffac41' }} />
                    <h3 className="my-5 text-3xl">Restaurant</h3>
                </div>
                <div className="flex flex-col items-center p-10 hover:shadow-2xl transition ease-in-out delay-150 hover:-translate-y-6 hover:scale-105 duration-300 wow animate__animated animate__zoomIn" data-wow-delay="0.1s">
                    <MdPool className='text-5xl' style={{ color: '#ffac41' }} />
                    <h3 className="my-5 text-3xl">Swimming Pool</h3>
                </div>
                <div className="flex flex-col items-center p-10 hover:shadow-2xl transition ease-in-out delay-150 hover:-translate-y-6 hover:scale-105 duration-300 wow animate__animated animate__zoomIn" data-wow-delay="0.3s">
                    <MdLocalParking className='text-5xl' style={{ color: '#ffac41' }} />
                    <h3 className="my-5 text-3xl">Parking</h3>
                </div>
                <div className="flex flex-col items-center p-10 hover:shadow-2xl transition ease-in-out delay-150 hover:-translate-y-6 hover:scale-105 duration-300 wow animate__animated animate__zoomIn" data-wow-delay="0.5s">
                    <MdRoomService className='text-5xl' style={{ color: '#ffac41' }} />
                    <h3 className="my-5 text-3xl">Room Service</h3>
                </div>
            </div>
        </section>
    )
}

export default ServicesCard