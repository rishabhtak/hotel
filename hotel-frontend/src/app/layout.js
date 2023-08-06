"use client";
import { Suspense } from "react";
import './globals.css'
import 'animate.css';
import { ThemeProvider } from "@material-tailwind/react";
import NavbarLayout from "@/components/Layout/NavbarLayout";
import Footer from '@/components/Layout/Footer';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import ScrollTop from '@/components/Layout/ScrollTop';
import Loading from './loading';


export const metadata = {
  title: 'Hotel Frontend',
  description: 'Hotel Frontend',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#f8fafc' }}>
        <ThemeProvider>
          <NavbarLayout />
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
          <ScrollTop />
          <FloatingWhatsApp phoneNumber='9876543210' accountName="Your Name" allowEsc />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
