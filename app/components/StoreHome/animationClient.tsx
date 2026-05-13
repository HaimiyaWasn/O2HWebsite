"use client";

import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Playfair_Display } from "next/font/google";

import HomeProductCard from "./cardClient";
import RevealOnScroll from "../RevealOnScroll";

// Tipe data produk
type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
  sold: string;
  slug: string;
};

// Konfigurasi font
const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

export default function AnimationClient({
  products,
}: {
  products: Product[];
}) {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">

          <RevealOnScroll>
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

          <RevealOnScroll delay={150}>
            <Link
              href="/stores"
              className={`flex items-center gap-2 text-sm md:text-base opacity-50 hover:opacity-100 active:opacity-100 ${playfairDisplayRegular.className}`}
            >
              View More
              <FaArrowAltCircleRight size={20} />
            </Link>
          </RevealOnScroll>

        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {products.map((product, index) => (
            <RevealOnScroll
              key={product.id}
              delay={300 + index * 75}
            >
              <Link href={`/stores/${product.slug}`}>
                <HomeProductCard product={product} />
              </Link>
            </RevealOnScroll>
          ))}

        </div>
      </div>
    </section>
  );
}