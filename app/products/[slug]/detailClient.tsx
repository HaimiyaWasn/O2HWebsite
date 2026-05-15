"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Playfair_Display } from "next/font/google";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Navbar from "@/app/components/NavbarO2H";
import Footer from "@/app/components/Footer";
import FloatingLogo from "@/app/components/FloatingLogo";
import RevealOnScroll from "@/app/components/RevealOnScroll";

type Products = {
  id: number;
  title: string;
  price: string;
  image: string | string[];
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
  const images = Array.isArray(product.image) ? product.image : [product.image];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen py-12 pt-28 scroll-mt-12 md:scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            <div className="flex flex-col items-center">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden border-4 border-yellow-400">
                <Image
                  src={images[currentImageIndex]}
                  alt={product.title}
                  fill
                  className="object-contain"
                  priority
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full"
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-3 mt-5">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? "border-yellow-400 scale-105"
                          : "border-gray-300"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${index}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <span
                className={`text-lg md:text-2xl ${playfairDisplayBold.className}`}
              >
                {product.title}
              </span>
              <div className="flex flex-row">
                <span>Favorite</span>
                <span
                  className={`text-base md:text-lg ${playfairDisplayRegular.className}`}
                >
                  {product.price}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FloatingLogo />
    </>
  );
}
