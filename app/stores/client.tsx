"use client"

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import { FaArrowAltCircleRight } from "react-icons/fa";

import Navbar from "../components/Navbar";
import SearchStore from "./search/searchClient";

type Stores = {
  id: number;
  title: string;
  price: string;
  image: string;
  sold: string;
}

// Konfigurasi font
const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});


export default function StoresClient({
  allStore,
  totalPages,
  currentPage,
}: {
  allStore: any[];
  totalPages: number;
  currentPage: number;
}) {
  const [showContent, setShowContent] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowContent(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -90px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <title>Store | O2H Official Site</title>
      <Navbar />
      <section className="py-20 scroll-mt-12 md:scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex justify-center items-center mb-10">
            <SearchStore />

            
          </div>
        </div>
      </section>
    </>
  )
}