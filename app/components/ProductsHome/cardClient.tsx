"use client";

import Image from "next/image";
import { useState } from "react";
import { Playfair_Display } from "next/font/google"; // Font Playfair Display

// Konfigurasi font
const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

// Card produk
export default function HomeProductCard({ product }: any) {
  const [isHovered, setIsHovered] = useState(false);

  const images = Array.isArray(product.image) ? product.image : [product.image];

  const hasSecondImage = images.length > 1;

  return (
    <div
      className="flex flex-col bg-white rounded-md shadow-black border-2 border-yellow-400 hover:shadow-md active:scale-95 transition-all duration-300 p-2 cursor-pointer h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-40 overflow-hidden rounded">
        {/* Gambar produk */}
        <Image
          src={images[0]}
          alt={product.title}
          fill
          className={`object-cover transition-opacity duration-500 ${
            isHovered
              ? hasSecondImage
                ? "opacity-0 scale-105"
                : "scale-105"
              : "opacity-100 scale-100"
          }`}
        />

        {hasSecondImage && (
          <Image
            src={images[1]}
            alt={product.title}
            fill
            className={`object-cover transition-opacity duration-500 ${
              isHovered ? "opacity-100 scale-105" : "opacity-0 scale-105"
            }`}
          />
        )}
      </div>

      {/* Konten produk */}
      <div className="border-t border-yellow-400 my-3">
        <p
          className={`text-sm mt-2 line-clamp-2 text-black ${playfairDisplayBold.className}`}
        >
          {product.title}
        </p>

        <p className="text-yellow-500 mt-1 font-semibold">{product.price}</p>

        <p className="text-xs text-gray-500">{product.sold}</p>
      </div>
    </div>
  );
}
