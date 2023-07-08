'use client'
import { useState } from "react";
import Link from "next/link"
import styles from "@/app/styles/navbar.module.css"
import { BiMenu, BiX } from 'react-icons/bi';

function Navbar() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);


    return (
        <>
            <nav className={`${styles.navbar} ${sidebarOpen ? styles.active : ""}`} >
                <div className={styles.navbarList}>
                    <BiMenu color="white" size={30} onClick={toggleSidebar} className={`${sidebarOpen} ? ${styles.sidebarOpen} : "" `} />
                    <span className={`${styles.logo} ${styles.navLogo}`}><Link href="/">Hotel Logo</Link></span>
                    <div className={styles.menu}>
                        <div className={styles.logo_toggle}>
                            <span className={styles.logo}><Link href="/">Hotel Logo</Link></span>
                            <BiX color="white" size={30} onClick={closeSidebar} style={{ cursor: 'pointer' }} />
                        </div>
                        <ul className={styles.nav_links}>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/about">About</Link></li>
                            <li><Link href="/facilities">Facilities</Link></li>
                            <li><Link href="/">Services</Link></li>
                            <li><Link href="/">Contact</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar