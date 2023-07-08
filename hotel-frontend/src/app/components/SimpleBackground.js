'use client'
import React from 'react'
import Image from 'next/image'
import { Grid, Breadcrumbs, Typography } from '@mui/material'
import Link from 'next/link'
import styles from '@/app/styles/simplebackground.module.css'

function SimpleBackground() {
    return (
        <>
            <Grid container spacing={3} className={styles.simpleBackgroundItem}>
                <Image src="/slider3.jpg" className={styles.simpleImage} alt='slider3' width={1900} height={1200} />
                <div className={styles.simpleContent}>
                    <h1>Our Facilities</h1>
                </div>
                <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumbText}>
                    <Link underline="hover" href="/">
                        Home
                    </Link>
                    <Typography>Our Facilities</Typography>
                </Breadcrumbs>
            </Grid>
        </>
    )
}

export default SimpleBackground