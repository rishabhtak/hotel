
'use client';
import { useEffect } from "react";
import Image from "next/image";
import WOW from 'wowjs';


function AboutUsContent() {
    useEffect(() => {
        new WOW.WOW({
            live: false
        }).init();
    }, []);
    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-2">
                <div className="flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg">
                    <div className="max-w-xl mb-6">
                        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                            Welcome To <span className="text-blueText-color">Hotel</span>
                        </h2>
                        <p className="text-base text-justify text-gray-700 md:text-lg">
                            Where luxury meets comfort, and every moment is crafted to perfection. Nestled in the heart of our exquisite hotel promises an unforgettable experience that will leave you captivated and yearning for more.
                        </p>
                        <p className="text-base text-justify text-gray-700 md:text-lg my-10">
                            At Hotel, we believe in creating a haven of tranquility and indulgence, where guests can escape the ordinary and immerse themselves in an ambiance of opulence. From the moment you step foot into our elegant lobby, you&apos;ll be enveloped in an atmosphere of warmth and hospitality, where our attentive staff is dedicated to making your stay exceptional in every way.
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center -mx-4 lg:pl-8">
                    <div className="flex flex-col items-end px-3">
                        <Image
                            className="object-cover mb-6 rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56 wow animate__animated animate__zoomIn"
                            data-wow-delay="0.1s"
                            src="/about-1.jpg"
                            width={400}
                            height={400}
                            alt="about1"
                        />
                        <Image
                            className="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40 wow animate__animated animate__zoomIn"
                            data-wow-delay="0.3s"
                            src="/about-3.jpg"
                            width={400}
                            height={400}
                            alt="about3"
                        />
                    </div>
                    <div className="px-3">
                        <Image
                            className="object-cover w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80 wow animate__animated animate__zoomIn"
                            data-wow-delay="0.5s"
                            src="/about-2.jpg"
                            width={400}
                            height={400}
                            alt="about2"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUsContent