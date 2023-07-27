'use client';
import { useEffect } from "react";
import WOW from 'wowjs';
import {
    Typography,
    Button,
    Tooltip,
    Card,
    CardHeader,
    CardBody,
    CardFooter,

} from "@material-tailwind/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa6";
import Image from "next/image";
function TeamMembers() {
    useEffect(() => {
        new WOW.WOW({
            live: false
        }).init();
    }, []);
    const TeamData = [
        {
            id: 1,
            name: 'john doe',
            img: '/team-1.jpg',
            animationDelay: '0.1s'
        },
        {
            id: 2,
            name: 'alex kent',
            img: '/team-2.jpg',
            animationDelay: '0.3s'
        },
        {
            id: 3,
            name: 'john doe',
            img: '/team-1.jpg',
            animationDelay: '0.5s'
        },
        {
            id: 2,
            name: 'alex kent',
            img: '/team-2.jpg',
            animationDelay: '0.7s'
        }
    ];
    return (
        <div className="container px-5 sm:px-6 lg:px-10 xl:px-[5rem] py-16 mx-auto">
            <div className="flex justify-center pb-10 lg:pb-14">
                <Typography variant="h2" className="max-w-lg text-3xl text-gray-900 sm:text-5xl">
                    Meet Our <span className="text-blueText-color">Team</span>
                </Typography>
            </div>
            <div className="flex flex-wrap -m-5">
                {TeamData.map((element) => (
                    <div className=" p-5 lg:p-2 sm:w-1/2 lg:w-1/2 xl:w-1/4 wow animate__animated animate__fadeInUp" data-wow-delay={element.animationDelay}>
                        <Card key={element.id} className="lg:w-auto">
                            <CardHeader floated={false} className="h-50">
                                <Image src={element.img} alt="team1" width={400} height={400} />
                            </CardHeader>
                            <CardBody className="text-center">
                                <Typography variant="h4" color="blue-gray" className="mb-2 capitalize">
                                    {element.name}
                                </Typography>
                                <Typography color="blue" className="font-medium" textGradient>
                                    CEO / Co-Founder
                                </Typography>
                            </CardBody>
                            <CardFooter className="flex justify-center gap-7 pt-2">
                                <Tooltip content="Like">
                                    <Typography
                                        as="a"
                                        href="#twitter"
                                        variant="lead"
                                        color="light-blue"
                                        textGradient
                                    >
                                        <FaFacebook style={{ color: 'blue' }} />
                                    </Typography>
                                </Tooltip>
                                <Tooltip content="Follow">
                                    <Typography
                                        as="a"
                                        href="#twitter"
                                        variant="lead"
                                        color="light-blue"
                                        textGradient
                                    >
                                        <FaTwitter style={{ color: 'blue' }} />
                                    </Typography>
                                </Tooltip>
                                <Tooltip content="Follow">
                                    <Typography
                                        as="a"
                                        href="#instagram"
                                        variant="lead"
                                        color="purple"
                                        textGradient
                                    >
                                        <FaInstagram style={{ color: 'blue' }} />
                                    </Typography>
                                </Tooltip>
                            </CardFooter>
                        </Card>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default TeamMembers