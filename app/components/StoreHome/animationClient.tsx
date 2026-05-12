"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa"; // Ikon panah
import { Playfair_Display } from "next/font/google"; // Font Playfair Display

import HomeProductCard from "./cardClient"; // Card produk

// Tipe data produk
type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
  sold: string;
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

// Komponen daftar produk dengan animasi
export default function AnimationClient({ 
  products 
}: { 
  products: Product[] 
}) {
  // State animasi saat section masuk viewport
  const [showContent, setShowContent] = useState(false);

  // Ref untuk section
  const sectionRef = useRef<HTMLElement | null>(null);

  // Observer untuk memunculkan animasi
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowContent(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -90px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <h1
            className={`text-3xl md:text-4xl transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              showContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            } ${playfairDisplayBold.className}`}
          >
            Store
          </h1>

          <Link
            href="/stores"
            className={`flex items-center gap-2 text-sm md:text-base transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              showContent
                ? "opacity-50 hover:opacity-100 active:opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            } ${playfairDisplayRegular.className}`}
          >
            View More
            <FaArrowAltCircleRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* Menampilkan daftar produk */}
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                showContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
              // Delay animasi tiap card
              style={{
                transitionDelay: `${300 + index * 80}ms`,
              }}
            >
              <HomeProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
