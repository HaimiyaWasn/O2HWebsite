"use client";

import Link from "next/link";
import Image from "next/image";
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
};

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
      <section className="min-h-screen py-12 pt-28 scroll-mt-12 md:scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-10/12 aspect-square">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain border-4 border-yellow-400 rounded-xl"
                  priority
                />
              </div>
              <div className="space-y-6">
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FloatingLogo />
    </>
  );
}
