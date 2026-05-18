"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import { FaRegHeart } from "react-icons/fa";

import Navbar from "@/app/components/NavbarO2H";
import Footer from "@/app/components/Footer";
import FloatingLogo from "@/app/components/FloatingLogo";
import RevealOnScroll from "@/app/components/RevealOnScroll";

type Products = {
  id: number;
  title: string;
  price: string;
  label: string[];
  image: string | string[];
  deskripsi: string;
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
  const [showFullDescription, setShowFullDescription] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

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

  const shortDescription =
    product.deskripsi.length > 275
      ? product.deskripsi.slice(0, 275) + "..."
      : product.deskripsi;

  useEffect(() => {
    if (showFullDescription) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showFullDescription]);

  const closeDescription = () => {
    setShowFullDescription(false);

    if (descriptionRef.current) {
      descriptionRef.current.scrollTop = 0;
    }
  }

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
                <div className="hidden md:flex gap-3 mt-5 flex-wrap justify-center">
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

            {images.length > 1 && (
              <div className="flex md:hidden items-center justify-center gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      currentImageIndex === index
                        ? "w-6 h-2 bg-yellow-400"
                        : "w-2 h-2 bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* PRODUCT INFO */}
            <div className="flex flex-col">
              <div className="flex flex-wrap gap-2 mb-4">
                {product.label.map((item, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 text-xs md:text-sm rounded-md bg-yellow-400 text-black border border-white ${playfairDisplayBold.className}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <span
                className={`text-xl md:text-3xl mb-3 ${playfairDisplayBold.className}`}
              >
                {product.title}
              </span>

              <div className="flex flex-row gap-3 items-center justify-between mb-2">
                <span
                  className={`text-lg md:text-xl text-yellow-400 ${playfairDisplayBold.className}`}
                >
                  {product.price}
                </span>
                <button className="btn btn-sm rounded-xl hover:bg-yellow-400 active:bg-yellow-400 hover:text-black active:text-black text-yellow-400 transition-all duration-300">
                  <FaRegHeart size={16} />
                </button>
              </div>

              <span className="text-sm opacity-65 mb-7">{product.sold}</span>

              <div className="bg-base-200 rounded-2xl p-5 border border-yellow-300">
                <span
                  className={`block text-lg mb-4 text-yellow-400 ${playfairDisplayBold.className}`}
                >
                  Product Description
                </span>
                <p
                  className={`whitespace-pre-line leading-7 text-sm md:text-base opacity-90 ${playfairDisplayRegular.className}`}
                >
                  {shortDescription}
                </p>

                {product.deskripsi.length > 275 && (
                  <button
                    onClick={() => setShowFullDescription(true)}
                    className="mt-4 text-yellow-400 hover:text-yellow-300 transition-all duration-300 text-sm font-semibold"
                  >
                    Baca Selengkapnya
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        onClick={() => closeDescription()}
        className={`fixed inset-0 z-9999 flex items-center justify-center transition-all duration-300 ${
          showFullDescription
            ? "bg-black/70 opacity-100 visible"
            : "bg-black/0 opacity-0 invisible"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-base-200 border border-yellow-400 rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden transform transition-all duration-300 ${
            showFullDescription
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-95 opacity-0 translate-y-5"
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-yellow-400">
            <h2
              className={`text-xl text-yellow-400 ${playfairDisplayBold.className}`}
            >
              Product Description
            </h2>
            <button
              onClick={() => closeDescription()}
              className="btn btn-sm btn-circle text-red-500 text-lg opacity-50 hover:opacity-100 active:opacity-100"
            >
              ✕
            </button>
          </div>
          <div ref={descriptionRef} className="overflow-y-auto max-h-[70vh] p-5">
            <p
              className={`whitespace-pre-line leading-6 md:leading-7 text-sm md:text-base opacity-90 ${playfairDisplayRegular.className}`}
            >
              {product.deskripsi}
            </p>
          </div>
        </div>
      </div>
      <FloatingLogo />
      <Footer />
    </>
  );
}
