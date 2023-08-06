'use client';
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";


export default function RoomCarousel() {
    return (
        <Carousel autoplay autoplayDelay={5000} loop transition={{ duration: 1 }} style={{ margin: '50px 0 -160px 0' }}>
            <div className="relative">
                <Image
                    src="/roompic3.webp"
                    alt="image 1"
                    width={1500}
                    height={1000}
                    className="h-screen w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/5"></div>
            </div>
            <div className="relative">
                <Image
                    src="/roompic2.webp"
                    alt="image 2"
                    width={1500}
                    height={1000}
                    className="h-screen w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/5"></div>
            </div>
            <div className="relative">
                <Image
                    src="/roompic1.webp"
                    alt="image 3"
                    width={1500}
                    height={1000}
                    className="h-screen w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/5"></div>
            </div>
        </Carousel>
    );

}
