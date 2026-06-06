"use client";

import Image from "next/image";
import { useState } from "react";
import { Playfair_Display } from "next/font/google";

import { formatCurrency } from "@/lib/currencyFormatter";

/**
 * Font untuk judul produk
 */
const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

/**
 * Representasi satu produk
 * 
 * Cocok digunakan untuk:
 * - Homepage Product Card
 * - Product Grid
 * - Product List
 * - Featured Product
 */
type Product = {
  id: number; // ID unik produk
  title: string; // Nama produk
  price: number; // Harga produk sebelum diskon
  image: string[]; // Daftar gambar produk
  sold: string; // Jumlah produk yang sudah terjual
  isOutOfStock: boolean; // Status stok produk
  discount: number; // Persentase diskon (0 - 100)
  createdAt: string; // Tanggal produk dibuat
  slug: string; // Slug URL produk
};

/**
 * Props untuk ProductCard
 */
type ProductCardProps = {
  product: Product;
};

/**
 * Product Card untuk homepage
 * 
 * Fitur:
 * - Hover image swap
 * - Badge NEW
 * - Badge Discount
 * - Badge Out of Stock
 * - Format harga Indonesia
 * 
 * Cocok digunakan untuk:
 * - Homepage Store
 * - Featured Products
 * - Product Grid
 * - Product SHowcase
 */
export default function HomeProductCard({ product }: ProductCardProps) {
  /**
   * Menyimpan status hover card
   * 
   * Digunakan untuk mengganti gambar saat mouse berada di atas card
   */
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Daftar gambar produk
   */
  const images = product.image;

  /**
   * Menentukan apakah memiliki gambar produk kedua
   */
  const hasSecondImage = images.length > 1;

  /**
   * Menghitung harga setelah diskon
   */
  const finalPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  /**
   * Menentukan apakah produk termasuk kategori produk baru
   * 
   * Produk dianggap baru jika dibuat dalam 30 hari terakhir
   */
  const isNew =
    new Date(product.createdAt).getTime() >
    Date.now() - 30 * 24 * 60 * 60 * 1000;

  return (
    <div
      className={`flex flex-col bg-white rounded-md shadow-black border-2 border-yellow-400 hover:shadow-md transition-all duration-300 p-2 cursor-pointer h-full ${
        product.isOutOfStock ? "opacity-75" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative w-full h-40 overflow-hidden rounded`}>
        {product.isOutOfStock && (
          <div className="absolute top-1 left-1 z-30 bg-black text-white text-[10px] px-2 py-1 rounded font-bold">
            Stok Habis
          </div>
        )}

        {isNew && (
          <div className={`absolute left-1 z-20 bg-black text-white text-[10px] px-2 py-1 rounded font-bold ${
            product.isOutOfStock ? "top-8" : "top-1"
          }`}>
            NEW
          </div>
        )}

        {product.discount > 0 && (
          <div className="absolute top-1 right-1 z-20 bg-red-500 text-white text-[10px] px-2 py-1 rounded font-bold">
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

      <div className="border-t border-yellow-400 my-3 flex flex-col flex-1">
        <p
          className={`text-sm mt-2 line-clamp-2 h-10 text-black ${playfairDisplayBold.className}`}
        >
          {product.title}
        </p>

        <div className="mt-1 flex flex-col pt-3">
          {product.discount > 0 ? (
            <>
              <p className="text-xs text-gray-400 line-through">
                {formatCurrency(product.price)}
              </p>
              <p className="text-yellow-500 font-semibold">
                {formatCurrency(finalPrice)}
              </p>
            </>
          ) : (
            <>
              <p className="text-xs invisible">
                {formatCurrency(product.price)}
              </p>
              <p className="text-yellow-500 font-semibold">
                {formatCurrency(product.price)}
              </p>
            </>
          )}
        </div>

        <p className="text-xs text-gray-500">{product.sold}</p>
      </div>
    </div>
  );
}
