"use client";

import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@material-tailwind/react";
import NavbarLayout from "@/app/components/NavbarLayout"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hotel Frontend',
  description: 'Hotel Frontend',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <NavbarLayout />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
