"use client";
import React, { useEffect } from "react";
import Breadcrumb from "../layout/Breadcrumb";
import { MdMeetingRoom, MdPersonOutline } from "react-icons/md";
import RoomCarousel from "./RoomCarousel";
import { Typography, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { getRoomTypeDetail } from "../../redux/features/roomTypeDetail/roomTypeDetailSlice";
import Link from "next/link";
import { notFound } from "next/navigation";
import Loading from "../../app/loading";

export default function RoomDetail({ params }) {
  const { roomTypeDetail, loading } = useSelector(
    (state) => state.roomTypeDetail
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRoomTypeDetail(params.replace(/-/g, " ")));
  }, []);

  if (loading) {
    return <Loading />;
  } else if (roomTypeDetail.length === 0) {
    return notFound();
  }

  
  const imageData = [
    "https://res.cloudinary.com/dmhxdpc8o/image/upload/v1706034065/hotel/qxpvdsxhdgwped4flrwg.webp",
    "https://res.cloudinary.com/dmhxdpc8o/image/upload/v1706034076/hotel/qkxkh36wrzavvuz9t6wx.webp",
    "https://res.cloudinary.com/dmhxdpc8o/image/upload/v1706034073/hotel/gx0ii0kix0wb56z21pxb.webp",
  ];

  return (
    <>
      {roomTypeDetail &&
        roomTypeDetail?.map((elem) => (
          <React.Fragment key={elem._id}>
            <Breadcrumb img="/slider1.jpg" pageName={`${elem.roomType} Room`} />
            <section className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:pt-20">
              <div className="grid grid-cols-1 md:grid-cols-2 pb-16">
                <h1 className="capitalize text-5xl">{elem.roomType}</h1>
                <div className="text-xl mt-2 md:flex justify-end items-center md:mt-0">
                  <div className="flex flex-row items-center">
                    <MdMeetingRoom
                      className="text-5xl"
                      style={{ color: "#d3a478" }}
                    />
                    <span>{elem.totalRooms} Rooms</span>
                  </div>
                  <div className="flex flex-row items-center md:ml-5">
                    <MdPersonOutline
                      className="text-5xl"
                      style={{ color: "#d3a478" }}
                    />
                    <span>Max. 3 Guest</span>
                  </div>
                </div>
              </div>
              <RoomCarousel images={imageData} />
            </section>
            <div
              style={{
                backgroundImage: `url("/featuresBg.webp")`,
              }}
              className="pt-72 pb-24"
            >
              <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                <Typography className="capitalize text-white text-4xl">
                  features :-
                </Typography>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-5 text-xl text-white capitalize">
                  {elem.features[0].split(",").map((feature, index) => (
                    <p key={index}>{feature}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="col-span-2">
                  {elem.description.replace(/<[^>]*>/g, "")}
                </div>
                <div className="mt-5 lg:mt-40 lg:ms-12">
                  <Button color="white" className="bg-button-color w-full">
                    <Link href="/booking">Book Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
    </>
  );
}
