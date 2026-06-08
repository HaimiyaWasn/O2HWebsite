import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ScrollToTop from "./components/ScrollToTop";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import DisclaimerWrapper from "./components/Disclaimer/wrapper";
import { DisclaimerProvider } from "./components/Disclaimer/content";
import Navbar from "./components/Navbar/NavbarO2H";
import NavbarWrapper from "./components/Navbar/wrapper";
import FloatingLogo from "./components/FloatingLogo";
import Footer from "./components/Footer/client";
import FloatingCart from "./components/FloatingCarts";
import FloatingCartWrapper from "./components/FloatingCarts/wrapper";
import FooterWrapper from "./components/Footer/wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DisclaimerProvider>
          <NavbarWrapper>
            <Navbar />
          </NavbarWrapper>
          <DisclaimerWrapper />
          <ScrollToTop />
          {children}
          <FooterWrapper>
            <Footer variant="yellow" />
          </FooterWrapper>
          <FloatingCartWrapper>
            <FloatingCart />
          </FloatingCartWrapper>
        </DisclaimerProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
