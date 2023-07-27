'use client';
import { useState } from "react";
import { Carousel, Typography, Button, IconButton } from "@material-tailwind/react";
import Image from "next/image";

export default function HomeCarousel() {
  const [activeSliderIndex, setActiveSliderIndex] = useState(0);
  const sliderNext = (activeIndex) => {
    if (activeIndex === 2) {
      setActiveSliderIndex(0);
    }
    else {
      setActiveSliderIndex(activeIndex + 1)
    }
  }
  const sliderPrevious = (activeIndex) => {
    if (activeIndex === 0) {
      setActiveSliderIndex(2)
    }
    else {
      setActiveSliderIndex(activeIndex - 1)
    }
  }

  return (
    <Carousel autoplay loop transition={{ duration: 1 }} prevArrow={({ handlePrev, activeIndex }) => (
      <IconButton
        variant="text"
        color="white"
        size="lg"
        onClick={() => { handlePrev(); sliderPrevious(activeIndex); }}
        className="!absolute top-2/4 left-4 -translate-y-2/4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </IconButton>
    )}
      nextArrow={({ handleNext, activeIndex }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={() => { handleNext(); sliderNext(activeIndex); }}
          className="!absolute top-2/4 !right-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </IconButton>
      )}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
              onClick={() => {
                setActiveIndex(i)
                setActiveSliderIndex(i)
              }}
            />
          ))}
        </div>
      )}
    >
      <div className="relative h-full w-full">
        <Image
          src="/slider1.jpg"
          alt="image 1"
          width={1366}
          height={768}
          className="h-screen w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/50">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className={`${activeSliderIndex === 0 ? "slide-in-top" : ""} mb-12 text-3xl md:text-4xl lg:text-5xl`}
            >
              Discover A Brand Luxurious Hotel
            </Typography>
            <div className="grid sm:flex justify-center gap-2 mt-12">
              <Button size="lg" color="white" className={`${activeSliderIndex === 0 ? "slide-in-left" : ""} bg-button-color`}>
                Book Now
              </Button>
              <Button size="lg" color="white" className={`${activeSliderIndex === 0 ? "slide-in-right" : ""}`}>
                Our Rooms
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <Image
          src="/slider2.jpg"
          alt="image 2"
          width={1366}
          height={768}
          className="h-screen w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/50">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className={`${activeSliderIndex === 1 ? "slide-in-top" : ""} mb-12 text-3xl md:text-4xl lg:text-5xl`}
            >
              Discover A Brand Luxurious Hotel
            </Typography>
            <div className="grid sm:flex justify-center gap-2 mt-12">
              <Button size="lg" color="white" className={`${activeSliderIndex === 1 ? "slide-in-left" : ""} bg-button-color`}>
                Book Now
              </Button>
              <Button size="lg" color="white" className={`${activeSliderIndex === 1 ? "slide-in-right" : ""}`}>
                Our Rooms
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <Image
          src="/slider3.jpg"
          alt="image 3"
          width={1366}
          height={768}
          className="h-screen w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/50">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className={`${activeSliderIndex === 2 ? "slide-in-top" : ""} mb-12 text-3xl md:text-4xl lg:text-5xl`}
            >
              Discover A Brand Luxurious Hotel
            </Typography>
            <div className="grid sm:flex justify-center gap-2 mt-12">
              <Button size="lg" color="white" className={`${activeSliderIndex === 2 ? "slide-in-left" : ""} bg-button-color`}>
                Book Now
              </Button>
              <Button size="lg" color="white" className={`${activeSliderIndex === 2 ? "slide-in-right" : ""}`}>
                Our Rooms
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Carousel >
  );
}