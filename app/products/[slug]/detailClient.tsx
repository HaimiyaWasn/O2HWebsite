"use client"

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Playfair_Display } from "next/font/google";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Navbar from "@/app/components/NavbarO2H";
import FloatingLogo from "@/app/components/FloatingLogo";

type Products = {
  id: number;
  title: string;
  price: string;
  image: string;
  sold: string;
  slug: string;
}

// Konfigurasi font Playfair Display untuk judul dan konten
const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

export default function DetailClient({ product }: { product: Products }) {
  return (
    <>
      <Navbar />
      <section>
        <div>
          <p>
            
          </p>
        </div>
      </section>
      <FloatingLogo />
    </>
  )
}