'use client'
import { Grid, Typography } from "@mui/material"
import SimpleBackground from "../components/SimpleBackground"
import Image from "next/image"
import styles from '@/app/styles/about.module.css'


const About = () => {
    return (
        <>
            <SimpleBackground text="about us" imgLink="/slider3.jpg" />
            <Grid container spacing={3} style={{ background: "rgba(240, 240, 240, 0.82)" }}>
                <Grid item xs={12} sm={12} md={6} mt={5}>
                    <div className={styles.aboutContent}>
                        <Typography variant="h2">Hotel & Resort</Typography>
                        <Typography style={{ fontSize: '1.5rem' }}>Our Vision</Typography>
                        <Typography mt={5}>Our vision for our hotel is to be recognized as a benchmark for excellence in hospitality, where guests feel welcomed, pampered, and inspired. We are passionate about creating a harmonious blend of comfort, luxury, and personalized service, leaving a lasting impression on all who choose to stay with us.</Typography>
                    </div>

                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Image src='/test.webp' className={styles.aboutImage} alt="about" height={600} width={700} />
                </Grid>
            </Grid>
            <Grid container spacing={3} style={{ background: "rgba(240, 240, 240, 0.82)" }}>
                <Grid item xs={12} sm={12} md={6}>
                    <Image src='/test.webp' className={styles.aboutImage} alt="about" height={600} width={700} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} mt={5}>
                    <div className={styles.aboutContent}>
                        <Typography variant="h2">Hotel & Resort</Typography>
                        <Typography style={{ fontSize: '1.5rem' }}>Sustainability and Responsibility</Typography>
                        <Typography mt={5}>We are committed to minimizing our environmental footprint and contributing positively to the communities we operate in. We prioritize sustainable practices throughout our hotel operations, such as energy and water conservation, waste reduction, and supporting local initiatives. By acting responsibly, we aim to inspire our guests to make conscious choices during their stay.</Typography>
                    </div>

                </Grid>
            </Grid>
            <Grid container spacing={3} style={{ background: "rgba(240, 240, 240, 0.82)" }}>

                <Grid item xs={12} sm={12} md={6} mt={5}>
                    <div className={styles.aboutContent}>
                        <Typography variant="h2">Hotel & Resort</Typography>
                        <Typography style={{ fontSize: '1.5rem' }}>Sustainability and Responsibility</Typography>
                        <Typography mt={5}> We understand the importance of gastronomic delights in enhancing the overall experience. Our hotel offers a range of culinary options, from fine dining to casual eateries, each showcasing the finest ingredients and flavors. We aim to tantalize the taste buds and create culinary memories that guests will cherish.</Typography>
                    </div>

                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Image src='/test.webp' className={styles.aboutImage} alt="about" height={600} width={700} />
                </Grid>
            </Grid>
        </>
    )
}

export default About