import React from 'react'
import styles from '@/app/styles/footer.module.css'
import { Grid } from "@mui/material";
import { Facebook, Instagram, LinkedIn } from '@mui/icons-material';
import Link from "next/link";
import Image from 'next/image';


const Footer = () => {
    return (
        <>
            <div className={styles.footer}>
                <Grid container className={styles.footerContainer}>
                    <Grid item sm={12} md={6} lg={4} style={{ marginBottom: '1rem' }}>
                        <div className={styles.logo} style={{ color: 'white', fontSize: '2rem' }}>
                            Hotel Logo
                        </div>
                        <ul>
                            <li>Jaipur,Rajasthan,India</li>
                            <li><Link href="mailto:demo@mail.com">demo@mail.com</Link></li>
                            <li><Link href="tel:9876543210">+91-9876543210</Link></li>
                        </ul>
                    </Grid>
                    <Grid item sm={12} md={6} lg={4} style={{ marginBottom: '1rem' }}>
                        <h4>Useful Links</h4>
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/">Help</Link></li>
                            <li><Link href="/">Contact Us</Link></li>
                        </ul>
                    </Grid>
                    <Grid item sm={12} md={6} lg={4}>
                        <h4>Help &amp; Information</h4>
                        <ul>
                            <li><Link href="/">Help</Link></li>
                            <li><Link href="/">FAQ's</Link></li>
                            <li><Link href="/">Shipping</Link></li>
                            <li><Link href="/">Tracking ID</Link></li>
                        </ul>
                    </Grid>
                    <Grid item lg={12} className={styles.underFooterContainer}>
                        <div className={styles.underFooter}>
                            <p>Copyright © 2023 Rishabh Tak. All Rights Reserved.
                            </p>
                            <ul>
                                <li><a href="#"><Facebook /></a></li>
                                <li><a href="#"><LinkedIn /></a></li>
                                <li><a href="#"><Instagram /></a></li>
                            </ul>
                        </div>
                    </Grid>
                </Grid>
            </div>

        </>
    )
}

export default Footer