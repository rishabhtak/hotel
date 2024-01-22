"use client";
import { Suspense } from "react";
import "./globals.css";
import "animate.css";
import { ThemeProvider } from "@material-tailwind/react";
import NavbarLayout from "../components/layout/NavbarLayout";
import Footer from "../components/layout/Footer";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import ScrollTop from "../components/layout/ScrollTop";
import Loading from "./loading";
import { ReduxProvider } from "../redux/provider";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#f8fafc" }}>
        <ReduxProvider>
          <ThemeProvider>
            <NavbarLayout />
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <ScrollTop />
            <FloatingWhatsApp
              phoneNumber="9876543210"
              accountName="Your Name"
              allowEsc
            />
            <Footer />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
