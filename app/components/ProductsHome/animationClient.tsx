"use client";

import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Playfair_Display } from "next/font/google";

import HomeProductCard from "./cardClient";
import RevealOnScroll from "../RevealOnScroll";

type Product = {
  id: number;
  title: string;
  price: number;
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

type AnimationCardClientProps = {
  products: Product[];
}

export default function AnimationCardClient({
  products,
}: AnimationCardClientProps) {
  return (
    <section className="py-10 scroll-mt-12 md:scroll-mt-16" id="card-products">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <RevealOnScroll delay={300}>
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

          <RevealOnScroll delay={500}>
            <Link
              href="/products"
              className={`flex items-center gap-2 text-sm md:text-base opacity-50 hover:opacity-100 active:opacity-100 ${playfairDisplayRegular.className}`}
            >
              View More
              <FaArrowAltCircleRight size={20} />
            </Link>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={750}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="h-full"
              >
                <HomeProductCard product={product} />
              </Link>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
