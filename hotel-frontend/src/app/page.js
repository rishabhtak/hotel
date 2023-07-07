"use client";

import SwiperSlide from "@/app/components/SwiperSlide"
import Image from "next/image"
import { Grid, Box, Typography, styled, Divider } from "@mui/material";
import styles from '@/app/styles/home.module.css'
import cards from '@/app/styles/card.module.css'
import CountUp from 'react-countup';
import { Facebook, Instagram, LinkedIn, Spa, FoodBank } from '@mui/icons-material';
import Link from "next/link";

const AboutSection = styled('div')(({ theme }) => ({
  padding: theme.spacing(7),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));
const Counter = styled('div')(({ theme }) => ({
  margin: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(1),
  },
}));
export default function Home() {
  const counterData = [{
    "counternum": 1,
    "countup": {
      "start": 0,
      "end": 5,
    },
    "label": 'years of',
    "desc": "experience"
  },
  {
    "counternum": 2,
    "countup": {
      "start": 0,
      "end": 25,
    },
    "label": 'rooms at',
    "desc": "luxury"
  },
  {
    "counternum": 3,
    "countup": {
      "start": 0,
      "end": 15,
    },
    "label": 'teams of',
    "desc": "Professionals"
  }]

  return (
    <>

      <SwiperSlide />
      <AboutSection>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} mt={5}>
            <Typography variant="h2" style={{ fontSize: '3.2rem' }}>Welcome To Hotel!</Typography>
            <Typography mt={5} style={{ lineHeight: 2 }}>Welcome to our exquisite new hotel, where luxury and comfort intertwine to create an unforgettable experience. Nestled in the heart of [City Name], our meticulously designed establishment stands as a testament to refined elegance.</Typography>
            <Typography mt={5} style={{ lineHeight: 2 }}>From the moment you step into our elegant lobby, you'll be greeted by our attentive and knowledgeable staff, dedicated to providing exceptional service throughout your stay. Our tastefully decorated rooms and suites offer a haven of tranquility, adorned with modern amenities and plush furnishings, ensuring a restful retreat after a day of exploration or business engagements.</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Image src='/about.webp' alt="about" height={600} width={450} style={{ float: 'right', border: '0.8rem solid white', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }} />
          </Grid>
        </Grid>
      </AboutSection>
      <Grid container mt={5}>
        <Grid item xs={12} sm={6} lg={4}>
          <div className={styles.card}>
            <div className={styles.cardImage}>
              <Image src='/palace.webp' alt="palace" height={400} width={600} />
            </div>
            <div className={styles.blogContent}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& hr': {
                    mx: 8,
                  },
                }}
              >
                <FoodBank style={{ fontSize: '3rem' }} />
                <Divider orientation="vertical" flexItem />
                <span style={{ fontSize: '2rem' }}>Food</span>
              </Box>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <div className={styles.card}>
            <div className={styles.cardImage}>
              <Image src='/swimming.webp' alt="palace" height={400} width={600} />
            </div>
            <div className={styles.blogContent}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& hr': {
                    mx: 8,
                  },
                }}
              >
                <Spa style={{ fontSize: '3rem' }} />
                <Divider orientation="vertical" flexItem />
                <span style={{ fontSize: '2rem' }}>Relax</span>
              </Box>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <div className={styles.card}>
            <div className={styles.cardImage}>
              <Image src='/palace.webp' alt="palace" height={400} width={600} />
            </div>
            <div className={styles.blogContent}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& hr': {
                    mx: 8,
                  },
                }}
              >
                <FoodBank style={{ fontSize: '3rem' }} />
                <Divider orientation="vertical" flexItem />
                <span style={{ fontSize: '2rem' }}>Food</span>
              </Box>
            </div>
          </div>
        </Grid>
      </Grid >
      <Counter>
        <Grid container spacing={2}>
          {counterData.map((element, index) => {
            return <Grid key={element.counternum} item xs={12} sm={6} lg={4}>
              <div className={styles.counter}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& hr': {
                      mx: 8,
                    },
                  }}
                >
                  <CountUp className={styles.countUp} start={element.countup.start} end={element.countup.end} duration={5} />
                  <div className={styles.counterContent}>
                    <div className={styles.label}>{element.label}</div>
                    <div className={styles.desc}>{element.desc}</div>
                  </div>
                  {index !== 2 ? <Divider orientation="vertical" flexItem /> : ""}
                </Box>
              </div>
            </Grid>
          })}
        </Grid>
      </Counter>
      <div className={styles.dividerMain}>
        <div className={styles.divider}>
          <span className={styles.dividerTitle}>OUR PROFESSIONALS</span>
        </div>
        <div className={styles.dividerText}>Meet Our Amazing Team</div>
      </div>
      <Grid container spacing={2}>
        {[1, 2, 3].map((v, i) => {
          return <Grid item key={i} xs={12} sm={6} lg={4}>
            <div className={cards.main}>
              <div className={cards.card}>
                <Image src='/photo1.jpg' width={340} height={340} alt='photo1' />
                <div>
                  <div className={cards.title}>
                    John Doe
                    <div style={{ fontSize: "1rem", textAlign: 'center' }}>CEO</div>
                  </div>
                  <p className={cards.content}>
                    <Facebook style={{ marginRight: '1rem', cursor: 'pointer' }} />
                    <Instagram style={{ marginRight: '1rem', cursor: 'pointer' }} />
                    <LinkedIn style={{ cursor: 'pointer' }} />
                  </p>
                </div>
              </div>
            </div>
          </Grid>
        })}
      </Grid>
      <Grid container className={styles.BookingMain}>
        <Image src='/booking.webp' alt="booking" width={1200} height={800} className={styles.bookingImage}/>
        <div className={styles.dividerMain} style={{ position: 'absolute', color: 'white' }}>
          <div className={styles.divider}>
            <span className={styles.dividerTitle}>Book Directly</span>
          </div>
          <div className={styles.dividerText} style={{ marginBottom: '2rem' }}>To Avail Exclusive Benefits</div>
          <Link href='/' className={styles.bookingButton}>Book Now</Link>
        </div>
      </Grid>
    </>
  )
}
