"use client";

import Image from "next/image";
import { useState } from "react";
import { Playfair_Display } from "next/font/google";

const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

type Product = {
  id: number;
  title: string;
  price: number;
  image: string[];
  sold: string;
  size: string[];
  discount: number;
  createdAt: string;
  slug: string;
};

export default function HomeProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);

  const images = product.image;

  const hasSecondImage = images.length > 1;

  const finalPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  const isNew =
    new Date(product.createdAt).getTime() >
    Date.now() - 30 * 24 * 60 * 60 * 1000;

  return (
    <div
      className="flex flex-col bg-white rounded-md shadow-black border-2 border-yellow-400 hover:shadow-md transition-all duration-300 p-2 cursor-pointer h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-40 overflow-hidden rounded">
        {/* Gambar produk */}
        {isNew && (
          <div className="absolute top-2 left-2 z-20 bg-black text-white text-[10px] px-2 py-1 rounded">
            NEW
          </div>
        )}

        {product.discount > 0 && (
          <div className="absolute top-1 right-1 z-20 bg-red-500 text-white text-[10px] px-2 py-1 rounded">
            -{product.discount}%
          </div>
        )}
        <Image
          src={images[0]}
          alt={product.title}
          fill
          className={`pointer-events-none object-cover transition-opacity duration-500 ${
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
            className={`pointer-events-none object-cover transition-opacity duration-500 ${
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

        <div className="mt-1 flex flex-col">
          {product.discount > 0 ? (
            <>
              <p className="text-xs text-gray-400 line-through">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(product.price)}
              </p>
              <p className="text-yellow-500 font-semibold">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(finalPrice)}
              </p>
            </>
          ) : (
            <p className="text-yellow-500 font-semibold">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(product.price)}
            </p>
          )}
        </div>

        <p className="text-xs text-gray-500">{product.sold}</p>
      </div>
    </div>
  );
}
