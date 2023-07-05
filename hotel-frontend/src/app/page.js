"use client";

import SwiperSlide from "@/app/components/SwiperSlide"
import Image from "next/image"
import { Button, Grid, Stack, Box, Typography, styled } from "@mui/material";
import styles from '@/app/styles/home.module.css'


const Root = styled('div')(({ theme }) => ({
  padding: theme.spacing(7),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));
export default function Home() {

  return (
    <>

      <SwiperSlide />
      <Root>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} mt={5}>
            <Typography variant="h2" style={{ fontSize: '3.2rem' }}>Welcome To Hotel!</Typography>
            <Typography mt={5} style={{ lineHeight: '2' }}>Welcome to our exquisite new hotel, where luxury and comfort intertwine to create an unforgettable experience. Nestled in the heart of [City Name], our meticulously designed establishment stands as a testament to refined elegance.</Typography>
            <Typography mt={5} style={{ lineHeight: '2' }}>From the moment you step into our elegant lobby, you'll be greeted by our attentive and knowledgeable staff, dedicated to providing exceptional service throughout your stay. Our tastefully decorated rooms and suites offer a haven of tranquility, adorned with modern amenities and plush furnishings, ensuring a restful retreat after a day of exploration or business engagements.</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Image src='/about.webp' alt="about" height={600} width={450} style={{ float: 'right', border: '0.8rem solid white', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }} />
          </Grid>
        </Grid>
      </Root>
      <Grid container>
        <Grid item xs={12} sm={6} lg={4}>
          <div className={styles.card}>
            <div className={styles.cardImage}>
              <Image src='/palace.webp' alt="palace" height={400} width={600} />
            </div>
            <div className={styles.blogContent}>
              <span>icon</span>
              <span>Food</span>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <div className={styles.card}>
            <div className={styles.cardImage}>
              <Image src='/swimming.webp' alt="palace" height={400} width={600} />
            </div>
            <div className={styles.blogContent}>
              <span>icon</span>
              <span>Food</span>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <div className={styles.card}>
            <div className={styles.cardImage}>
              <Image src='/palace.webp' alt="palace" height={400} width={600} />
            </div>
            <div className={styles.blogContent}>
              <span>icon</span>
              <span>Food</span>
            </div>
          </div>
        </Grid>
      </Grid >
    </>
  )
}
