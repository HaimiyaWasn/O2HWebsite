"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import { FaArrowAltCircleRight } from "react-icons/fa";

import Navbar from "../components/NavbarO2H";
import SearchStore from "./search/searchClient";
import StoreFilter from "./components/storesFilter";
import FloatingLogo from "../components/FloatingLogo";

type Products = {
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

export default function StoresClient({
  allProducts,
  totalPages,
  currentPage,
}: {
  allProducts: Products[];
  totalPages: number;
  currentPage: number;
}) {
  const [showContent, setShowContent] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

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
    <>
      <title>Store | O2H Official Site</title>
      <Navbar />
      <section className="py-20 scroll-mt-12 md:scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-center items-center mb-7">
            <SearchStore />
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-70">
              <StoreFilter />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <span className={`text-2xl md:text-3xl font-bold`}>
                  All Product
                </span>

                <div className="flex items-center gap-3">
                  <span className={`font-semibold whitespace-nowrap`}>
                    Urutkan:
                  </span>
                  <select className="select border border-yellow-400 rounded-xl px-4 py-2 outline-none w-full md:w-60">
                    <option>Terbaru</option>
                    <option>Terlama</option>
                    <option>Terpopuler</option>
                    <option>Rating Tertinggi</option>
                    <option>Harga Terendah</option>
                    <option>Harga Tertinggi</option>
                    <option>Nama Produk (A-Z)</option>
                    <option>Nama Produk (Z-A)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {allProducts.map((product, index) => (
                  <Link key={product.id} href="#">
                    <div
                      key={product.id}
                      className="flex flex-col bg-white rounded-md shadow-black border-2 border-yellow-400 hover:shadow-md active:scale-95 transition-all duration-300 p-2 cursor-pointer h-full"
                    >
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={300}
                        height={300}
                        className="w-full h-40 object-cover rounded"
                      />
                      <div className="border-t border-yellow-400 my-3">
                        <p
                          className={`text-sm mt-2 line-clamp-2 text-black ${playfairDisplayBold.className}`}
                        >
                          {product.title}
                        </p>
                        <p className="text-yellow-500 mt-1 font-semibold">
                          {product.price}
                        </p>
                        <p className="text-xs text-gray-500">{product.sold}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <FloatingLogo />
      </section>
    </>
  );
}
