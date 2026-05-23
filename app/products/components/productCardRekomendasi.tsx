"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Playfair_Display } from "next/font/google";

type Products = {
  id: number;
  title: string;
  createdDate: string;
  price: string;
  label: string[];
  image: string | string[];
  deskripsi: string;
  sold: string;
  size: string[];
  diskon: boolean;
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

type ProductCardRekomendasiProps = {
  product: Products[];
  currentProductId: number;
};

export default function ProductCardRekomendasi({
  product,
  currentProductId,
}: ProductCardRekomendasiProps) {
  const randomizedProducts = useMemo(() => {
    return [...product]
      .filter((item) => item.id !== currentProductId)
      .sort(() => Math.random() - 0.5)
      .slice(0, 12);
  }, [product, currentProductId]);

  return (
    <>
      <div className="flex flex-col w-full py-5">
        <span
          className={`text-lg md:text-2xl border-b border-yellow-400 p-3 ${playfairDisplayBold.className}`}
        >
          Rekomendasi
        </span>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-5">
          {randomizedProducts.map((item) => (
            <CardItem key={item.id} product={item} />
          ))}
        </div>
      </div>
    </>
  );
}

function CardItem({ product }: { product: Products }) {
  const [isHovered, setIsHovered] = useState(false);

  const images = Array.isArray(product.image)
    ? product.image
    : [product.image];

  const hasSecondImage = images.length > 1;

  return (
    <Link href={`/products/${product.slug}`}>
      <div
        className="flex flex-col bg-white rounded-md shadow-black border-2 border-yellow-400 hover:shadow-md transition-all duration-300 p-2 cursor-pointer h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* IMAGE */}
        <div className="relative w-full h-40 overflow-hidden rounded">
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
                isHovered
                  ? "opacity-100 scale-105"
                  : "opacity-0 scale-105"
              }`}
            />
          )}
        </div>

        {/* CONTENT */}
        <div className="border-t border-yellow-400 my-3">
          <p
            className={`text-sm mt-2 line-clamp-2 text-black ${playfairDisplayBold.className}`}
          >
            {product.title}
          </p>

          <p className="text-yellow-500 mt-1 font-semibold">
            {product.price}
          </p>

          <p className="text-xs text-gray-500">
            {product.sold}
          </p>
        </div>
      </div>
    </Link>
  );
}
