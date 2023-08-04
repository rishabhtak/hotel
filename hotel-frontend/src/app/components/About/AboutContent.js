'use client';
import { useEffect } from "react";
import Image from 'next/image'
import WOW from 'wowjs';

function AboutContent() {
    useEffect(() => {
        new WOW.WOW({
            live: false
        }).init();
    }, []);
    return (
        <section>
            <div className="mx-auto py-16 sm:py-24">
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 wow animate__animated animate__lightSpeedInLeft" style={{ backgroundColor: '#f3f3f3' }}>
                    <div className="relative h-[35rem]">
                        <Image alt="hotel photo" src="/slider1.jpg" width={1366} height={768} className="absolute inset-0 h-full w-full object-cover" />
                    </div>
                    <div className="py-20 lg:pt-16 xl:px-16">
                        <article className="text-justify space-y-4 px-5 lg:px-10">
                            <h2 className="text-3xl font-bold sm:text-4xl pb-5">
                                Our Vision
                            </h2>
                            <p className=' text-gray-600'>
                                Our vision is to be the epitome of hospitality, where every guest is embraced with warmth and treated to an unforgettable experience. We strive to create a haven of luxury and comfort, blending modern elegance with personalized service. At our hotel, we aim to exceed expectations, leaving a lasting impression of unparalleled excellence and making every stay a cherished memory.
                            </p>
                            <p className=' text-gray-600'>
                                Embracing the spirit of innovation, our hotel envisions being a trendsetter in the industry, continuously evolving to meet the changing needs of our guests. With a commitment to sustainability, we aspire to tread lightly on the planet while offering an oasis of indulgence.
                            </p>
                        </article>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 wow animate__animated animate__lightSpeedInRight"  style={{ backgroundColor: '#a88a5b' }}>
                    <div className="py-20 lg:pt-18 xl:px-16">
                        <article className="text-justify space-y-4 px-5 lg:px-10">
                            <h2 className="text-3xl font-bold sm:text-4xl pb-5">
                                Core Values
                            </h2>
                            <p className='text-white'>
                                <b>Excellence:</b> We are dedicated to achieving the highest standards in everything we do, delivering exceptional service, and exceeding expectations to create an unforgettable guest experience.
                            </p>
                            <p className=' text-white'>
                                <b>Integrity:</b> We conduct ourselves with honesty, transparency, and ethical principles, fostering trust among our guests, team members, and stakeholders.
                            </p>
                            <p className=' text-white'>
                                <b>Respect:</b> We treat every individual with kindness, empathy, and courtesy, valuing diversity and creating an inclusive environment that embraces and celebrates differences.
                            </p>

                        </article>
                    </div>
                    <div className="relative h-[35rem]">
                        <Image alt="hotel photo" src="/slider2.jpg" width={1366} height={768} className="absolute inset-0 h-full w-full object-cover" />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 wow animate__animated animate__lightSpeedInLeft"  style={{ backgroundColor: '#f3f3f3' }}>
                    <div className="relative h-[35rem]">
                        <Image alt="hotel photo" src="/slider3.jpg" width={1366} height={768} className="absolute inset-0 h-full w-full object-cover" />
                    </div>
                    <div className="py-20 lg:pt-18 xl:px-16">
                        <article className="text-justify space-y-4 px-5 lg:px-10">
                            <h2 className="text-3xl font-bold sm:text-4xl pb-5">
                                Our Mission
                            </h2>
                            <p className="text-gray-600">
                                Our mission is to provide exceptional hospitality and create memorable experiences that exceed our guests expectations. We strive to offer a welcoming and comfortable environment, where every individual is treated with genuine care and respect. Through personalized service, attention to detail, and a commitment to continuous improvement, we aim to be the preferred choice for travelers seeking a remarkable stay. With a focus on sustainability, we endeavor to contribute positively to the community and the environment, while fostering a culture of excellence and innovation among our dedicated team.
                            </p>
                        </article>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default AboutContent