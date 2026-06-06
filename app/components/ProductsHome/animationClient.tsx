"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Playfair_Display } from "next/font/google";

import HomeProductCard from "./cardClient";
import RevealOnScroll from "../RevealOnScroll";

/**
 * Representasi satu produk
 *
 * Dapat digunakan kembali untuk:
 * - Homepage Product Section
 * - Product List
 * - Featured Products
 * - Best Seller Products
 * - Products Search Result
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
 * Font untuk heading section
 */
const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

/**
 * Font untuk teks biasa dan link
 */
const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

/**
 * Propd yang diterima oleh AnimationCardClient
 */
type AnimationCardClientProps = {
  products: Product[]; // Daftar produk yang akan ditampilkan
};

/**
 * Menampilkan daftar produk di halaman utama dengan animasi
 *
 * Fitur:
 * - Animasi saat muncul di viewport
 * - Link menuju halaman semua produk
 * - Responsive grid layout
 * - Navigasi ke halaman detail produk
 *
 * Cocok digunakan untuk:
 * - Featured Products
 * - New Arrivals
 * - Best Seller
 * - Product Showcase
 * - Store Homepage
 */
export default function AnimationCardClient({
  products,
}: AnimationCardClientProps) {
  return (
    <section className="py-10 scroll-mt-12 md:scroll-mt-16" id="card-products">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <RevealOnScroll delay={0.05}>
            <div
              className={`inline-flex items-center rounded-full shadow-sm shadow-yellow-400 border-4 border-yellow-400/40 bg-yellow-400/10 px-4 py-2 backdrop-blur-md`}
            >
              <span
                className={`text-md md:text-2xl tracking-[0.2em] uppercase text-yellow-400 ${playfairDisplayBold.className}`}
              >
                Store
              </span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <Link
              href="/products"
              className={`flex items-center gap-2 text-sm md:text-base opacity-50 hover:opacity-100 active:opacity-100 ${playfairDisplayRegular.className}`}
            >
              View More
              <FaArrowAltCircleRight size={20} />
            </Link>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.4,
                delay: 0.15 + index * 0.05,
              }}
            >
              <Link href={`/products/${product.slug}`} className="h-full block">
                <HomeProductCard product={product} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
