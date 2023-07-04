'use client'

import React, { useRef, useState } from 'react';
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import ReactGlTransitionImage, {
    blurTransition
} from 'react-gl-transition-image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import styles from '@/app/styles/swiperslide.module.css'



// import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import Link from 'next/link';

export default function Slider() {
    const imgSrc = '/slider1.jpg';
    return (
        <>
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                loop={true}
                effect="fade"
                modules={[EffectFade, Navigation, Autoplay]}>
                <SwiperSlide>
                    <div className={styles.slideItem}>
                        <ReactGlTransitionImage
                            src='/slider1.jpg'
                            transition={blurTransition}
                            progress={1}
                        />
                        <div className={styles.slideCaption}>
                            <h1>Unforgettable luxury awaits you</h1>
                        </div>
                        <Link href='/' className={styles.slideButton}>Book Now</Link>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.slideItem}>
                        <Image src="/slider2.jpg" alt="slider1" width={1900} height={1200} />
                        <div className={styles.slideCaption}>
                            <h1>Elegant escape, timeless luxury awaits</h1>
                        </div>
                        <Link href='/' className={styles.slideButton}>Book Now</Link>
                    </div>

                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.slideItem}>
                        <Image src="/slider3.jpg" alt="slider1" width={1900} height={1200} />
                        <div className={styles.slideCaption}>
                            <h1>Elevated elegance awaits your arrival</h1>
                        </div>
                        <Link href='/' className={styles.slideButton}>Book Now</Link>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
