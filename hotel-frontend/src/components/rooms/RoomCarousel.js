"use client";
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";

export default function RoomCarousel({ images }) {
  const imageLoader = ({ src, width, quality }) => {
    return `${process.env.NEXT_PUBLIC_IMAGE}${src}?w=${width}&q=${
      quality || 75
    }`;
  };
  return (
    <Carousel
      autoplay
      autoplayDelay={5000}
      loop
      transition={{ duration: 1 }}
      style={{ margin: "50px 0 -160px 0" }}
    >
      {images?.map((image, index) => (
        <div key={index} className="relative">
          <Image
            loader={imageLoader}
            src={image}
            alt="image 1"
            width={1500}
            height={1000}
            className="h-screen w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/5"></div>
        </div>
      ))}
    </Carousel>
  );
}
