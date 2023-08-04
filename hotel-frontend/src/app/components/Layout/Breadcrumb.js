'use client'
import Image from 'next/image';
import { Typography } from "@material-tailwind/react";
import Link from 'next/link';

export default function Breadcrumb({ img, pageName }) {
    return (
        <div className="relative h-full w-full">
            <Image
                width={1366}
                height={768}
                className="h-[30rem] w-full object-cover object-center"
                src={img}
                alt="hotel image"
            />
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/50">
                <Typography
                    variant="h1"
                    color="white"
                    className="capitalize"
                >
                    {pageName}
                </Typography>
                <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap">
                    <Link href="/" className="text-white hover:text-blueText-color">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25px" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                    </Link>
                    <span className="mx-5 text-white rtl:-scale-x-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25px" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </span>
                    <p href="" className="text-white text-lg uppercase">
                        {pageName}
                    </p>
                </div>

            </div>
        </div >
    )
}

