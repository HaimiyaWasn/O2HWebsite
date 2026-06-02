"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Playfair_Display } from "next/font/google";

type Products = {
  id: number;
  title: string;
  price: number;
  label: string[];
  image: string[];
  sold: string;
  isOutOfStock: boolean;
  size: string[];
  discount: number;
  createdAt: string;
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

  const images = Array.isArray(product.image) ? product.image : [product.image];

  const hasSecondImage = images.length > 1;

  const finalPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  const isNew =
    new Date(product.createdAt).getTime() >
    Date.now() - 30 * 24 * 60 * 60 * 1000;

  return (
    <Link href={`/products/${product.slug}`}>
      <div
        className={`flex flex-col bg-white rounded-md shadow-black border-2 border-yellow-400 hover:shadow-md transition-all duration-300 p-2 cursor-pointer h-full ${
          product.isOutOfStock ? "opacity-75" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-40 overflow-hidden rounded">
          {product.isOutOfStock && (
            <div className="absolute top-1 left-1 z-30 bg-black text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
              Stok Habis
            </div>
          )}
          {isNew && (
            <div className="absolute top-1 left-1 z-20 bg-black text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
              NEW
            </div>
          )}

          {product.discount > 0 && (
            <div className="absolute top-1 right-1 z-20 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
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

        {/* CONTENT */}
        <div className="border-t border-yellow-400 my-3 flex flex-col flex-1">
          <p
            className={`text-sm mt-2 line-clamp-2 min-h-14 text-black ${playfairDisplayBold.className}`}
          >
            {product.title}
          </p>

          <div className="mt-1 flex flex-col min-h-12">
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
              <>
                <p className="text-xs invisible">
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
            )}
          </div>

          <p className="text-xs text-gray-500">{product.sold}</p>
        </div>
      </div>
    </Link>
  );
}
