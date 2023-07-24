'use client';

import { Carousel, Typography, Button } from "@material-tailwind/react";

export default function HomeCarousel() {
  return (
    <Carousel>
      <div className="relative h-full w-full">
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image 2"
          className="h-screen w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-12 text-3xl md:text-4xl lg:text-5xl"
            >
              Discover A Brand Luxurious Hotel
            </Typography>
            <div className="grid sm:flex justify-center gap-2 mt-12">
              <Button size="lg" color="white" className="bg-button-color">
                Book Now
              </Button>
              <Button size="lg" color="white">
                Our Rooms
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image 2"
          className="h-screen w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-12 text-3xl md:text-4xl lg:text-5xl"
            >
              Discover A Brand Luxurious Hotel
            </Typography>
            <div className="grid sm:flex justify-center gap-2 mt-12">
              <Button size="lg" color="white" className="bg-button-color">
                Book Now
              </Button>
              <Button size="lg" color="white">
                Our Rooms
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image 2"
          className="h-screen w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-12 text-3xl md:text-4xl lg:text-5xl"
            >
              Discover A Brand Luxurious Hotel
            </Typography>
            <div className="grid sm:flex justify-center gap-2 mt-12">
              <Button size="lg" color="white" className="bg-button-color">
                Book Now
              </Button>
              <Button size="lg" color="white">
                Our Rooms
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Carousel >
  );
}