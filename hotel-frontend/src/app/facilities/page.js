'use client'
import SimpleBackground from '../components/SimpleBackground'
import { Pool, FitnessCenter, Wifi, LocalParking, RoomService, LocalLaundryService, FreeBreakfast, Tv, SafetyCheck } from '@mui/icons-material';
import { Grid } from '@mui/material';
import styles from '@/app/styles/facilities.module.css'

function Facilities() {

  return (
    <>
      <SimpleBackground text="our facilities" imgLink="/slider3.jpg" />
      <Grid container>
        <Grid item sm={6} md={6} lg={4}>
          <div className={styles.card}>
            <Pool className={styles.cardIcon} />
            <div className={styles.cardText}>Swimming Pool</div>
          </div>
        </Grid>

        <Grid item sm={6} md={6} lg={4}>
          <div className={styles.card}>
            <FitnessCenter className={styles.cardIcon} />
            <div className={styles.cardText}>Gymnasium</div>
          </div>
        </Grid>
        <Grid item sm={6} md={6} lg={4}>
          <div className={styles.card}>
            <Wifi className={styles.cardIcon} />
            <div className={styles.cardText}>free wifi</div>
          </div>
        </Grid>
        <Grid item sm={6} md={6} lg={4}>
          <div className={styles.card}>
            <LocalParking className={styles.cardIcon} />
            <div className={styles.cardText}>parking</div>
          </div>
        </Grid>
        <Grid item sm={6} md={6} lg={4}>
          <div className={styles.card}>
            <RoomService className={styles.cardIcon} />
            <div className={styles.cardText}>Room Service</div>
          </div>
        </Grid>
        <Grid item sm={6} md={6} lg={4}>
          <div className={styles.card}>
            <LocalLaundryService className={styles.cardIcon} />
            <div className={styles.cardText}>free laundry</div>
          </div>
        </Grid>
        <Grid item sm={6} md={6} lg={4}>
          <div className={styles.card}>
            <FreeBreakfast className={styles.cardIcon} />
            <div className={styles.cardText}>Free Breakfast</div>
          </div>
        </Grid>
        <Grid item sm={6} md={6} lg={4}>
          <div className={styles.card}>
            <Tv className={styles.cardIcon} />
            <div className={styles.cardText}>Tv</div>
          </div>
        </Grid>
        <Grid item sm={6} md={6} lg={4}>
          <div className={styles.card}>
            <SafetyCheck className={styles.cardIcon} />
            <div className={styles.cardText}>Safety Check</div>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default Facilities