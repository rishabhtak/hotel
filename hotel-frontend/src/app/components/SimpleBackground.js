'use client'
import Image from 'next/image'
import { Grid, Breadcrumbs, Typography } from '@mui/material'
import Link from 'next/link'
import styles from '@/app/styles/simplebackground.module.css'

function SimpleBackground({text,imgLink}) {
    return (
        <>
            <Grid container spacing={3} className={styles.simpleBackgroundItem}>
                <Image src={imgLink} className={styles.simpleImage} alt='slider3' width={1900} height={1200} />
                <div className={styles.simpleContent}>
                    <h1>{text}</h1>
                </div>
                <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumbText}>
                    <Link underline="hover" href="/">
                        Home
                    </Link>
                    <Typography>{text}</Typography>
                </Breadcrumbs>
            </Grid>
        </>
    )
}

export default SimpleBackground