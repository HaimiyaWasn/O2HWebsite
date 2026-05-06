"use client"

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import Navbar from "../components/Navbar";
import FloatingLogo from "../components/FloatingLogo";
import Footer from "../components/Footer";

type News = {
  id: number;
  date: string;
  title: string;
  slug: string;
}

const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});
const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

export default function NewsClient({
  allNews
}: {
  allNews: News[]
}) {
  const [showContent, setShowContent] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    
  })

  return (
    <>
      <title>News | O2H Website Center</title>
      <Navbar />
      <section>

      </section>
      <Footer variant="yellow" />
      <FloatingLogo />
    </>
  );
}
