"use client";
import './globals.css'
import 'animate.css';
import { ThemeProvider } from "@material-tailwind/react";
import NavbarLayout from "@/app/components/NavbarLayout";
import Footer from './components/Footer';


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
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
