"use client";
import { useEffect } from "react";
import WOW from "wowjs";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getRoomDetail } from "../../redux/features/roomdetail/roomDetailSlice";
import Link from "next/link";
import Loading from "@/app/loading";
import { notFound } from "next/navigation";

export default function RoomCard() {
  const roomName = {
    "royal suite": 5000,
    "super deluxe": 3000,
    deluxe: 2000,
  };
  const { roomDetail, loading } = useSelector((state) => state.roomDetail);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRoomDetail());
    new WOW.WOW({
      live: false,
    }).init();
  }, []);

  const imageLoader = ({ src, width, quality }) => {
    return `${process.env.NEXT_PUBLIC_IMAGE}${src}?w=${width}&q=${
      quality || 75
    }`;
  };

  if (loading) {
    return <Loading />;
  } else if (roomDetail.length === 0) {
    return notFound();
  }

  return (
    <section className="py-16 m-4 md:m-8 flex flex-col items-center gap-5">
      {roomDetail &&
        roomDetail?.map((elem) => (
          <Card
            key={elem._id}
            className="w-full max-w-[60em] md:flex-row wow animate__animated animate__lightSpeedInLeft"
            data-wow-delay="0.1s"
          >
            <CardHeader
              shadow={false}
              floated={false}
              className="m-0 md:w-2/5 shrink-0 rounded-b-none md:rounded-r-none md:rounded-l-lg"
            >
              <Image
                loader={imageLoader}
                src={elem.images[0]}
                alt={elem.roomType}
                width={500}
                height={300}
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody className="bg-lime-50">
              <div className="flex items-center justify-between">
                <Typography
                  variant="h6"
                  color="blue"
                  className="mb-4 uppercase"
                >
                  {elem.roomType}
                </Typography>
                <div>
                  <Typography className="text-xs">
                    Starting from/night
                  </Typography>
                  <Typography className="flex justify-center text-xl font-bold">
                    &#x20b9; {roomName[elem.roomType]}*
                  </Typography>
                </div>
              </div>
              <Typography className="mb-8 font-normal">
                Enter a freshly updated and thoughtfully furnished peaceful home
                surrounded by ancient trees, stone walls, and open meadows.
              </Typography>
              <Typography variant="h6" className="capitalize">
                features :-
              </Typography>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 mt-2">
                {elem.features[0].split(",").map((feature, index) => (
                  <p key={index} className="capitalize">
                    {feature}
                  </p>
                ))}
              </div>
              <div className="grid sm:flex justify-center md:justify-between my-5 gap-7">
                <Button size="md" color="white" className="bg-button-color">
                  <Link href="/booking">Book Now</Link>
                </Button>
                <Button size="md" color="white">
                  <Link href={`/rooms/${elem.roomType.replace(/\s+/g, "-")}`}>
                    Room Details
                  </Link>
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
    </section>
  );
}
