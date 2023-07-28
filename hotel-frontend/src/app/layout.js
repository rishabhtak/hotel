"use client";
import './globals.css'
import 'animate.css';
import { ThemeProvider } from "@material-tailwind/react";
import NavbarLayout from "@/app/components/Layout/NavbarLayout";
import Footer from './components/Layout/Footer';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import ScrollTop from './components/Layout/ScrollTop';

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
          {children}
          <ScrollTop />
          <FloatingWhatsApp phoneNumber='9876543210' accountName="Rishabh" allowEsc />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
