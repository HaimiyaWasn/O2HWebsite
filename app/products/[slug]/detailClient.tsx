"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { Playfair_Display } from "next/font/google";

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

  const startX = useRef(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev < images.length - 1 ? prev + 1 : prev
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;

    if (diff > 50) {
      nextImage();
    }

    if (diff < -50) {
      prevImage();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    const endX = e.clientX;
    const diff = startX.current - endX;

    if (diff > 50) {
      nextImage();
    }

    if (diff < -50) {
      prevImage();
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen py-12 pt-28 scroll-mt-12 md:scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* IMAGE SLIDER */}
            <div className="flex flex-col items-center">
              <div
                className="relative w-full aspect-square rounded-xl overflow-hidden border-4 border-yellow-400 select-none cursor-grab active:cursor-grabbing touch-pan-y"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
              >
                <div
                  className="flex h-full transition-transform duration-500 ease-out"
                  style={{
                    width: `${images.length * 100}%`,
                    transform: `translateX(-${
                      currentImageIndex * (100 / images.length)
                    }%)`,
                  }}
                >
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="relative shrink-0 aspect-square"
                      style={{
                        width: `${100 / images.length}%`,
                      }}
                    >
                      <Image
                        src={img}
                        alt={`${product.title}-${index}`}
                        fill
                        draggable={false}
                        className="object-contain pointer-events-none select-none"
                        priority={index === 0}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* THUMBNAIL */}
              {images.length > 1 && (
                <div className="flex gap-3 mt-5 flex-wrap justify-center">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden border-4 transition-all duration-300 cursor-pointer ${
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

            {/* PRODUCT INFO */}
            <div className="flex flex-col justify-start">
              <span
                className={`text-xl md:text-3xl mb-3 ${playfairDisplayBold.className}`}
              >
                {product.title}
              </span>

              <div className="flex flex-row gap-3 items-center">
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
