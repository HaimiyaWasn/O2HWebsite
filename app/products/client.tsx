"use client";

import Link from "next/link";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

import Navbar from "../components/NavbarO2H";
import SearchProducts from "./search/searchClient";
import ProductsFilter from "./components/productsFilter";
import FloatingLogo from "../components/FloatingLogo";
import RevealOnScroll from "../components/RevealOnScroll";
import Footer from "../components/Footer";

type Products = {
  id: number;
  title: string;
  price: string;
  image: string | string[];
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

export default function ProductsClient({
  allProducts,
  totalPages,
  currentPage,
}: {
  allProducts: Products[];
  totalPages: number;
  currentPage: number;
}) {
  // Pagination
  const MAX_VISIBLE_PAGES = 5;

  // Hitung halaman yang akan ditampilkan
  let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));

  // Pastikan halaman akhir tidak melebihi total halaman
  let endPage = startPage + MAX_VISIBLE_PAGES - 1;

  // Jika halaman akhir melebihi total halaman, geser startPage ke kiri
  if (endPage > totalPages) {
    endPage = totalPages;

    startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
  }

  // Membuat array halaman yang akan ditampilkan
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <>
      <title>Products | O2H Official Site</title>
      <Navbar />
      <section className="pt-20 scroll-mt-12 md:scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-center items-center mb-7">
            <SearchProducts />
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-60">
              <ProductsFilter />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <RevealOnScroll>
                  <div
                    className={`flex w-full md:w-fit mb-3 md:mb-0 items-center justify-center rounded-full shadow-sm shadow-yellow-400 border-4 border-yellow-400/40 bg-yellow-400/10 px-4 py-2 backdrop-blur-md ${playfairDisplayBold.className}`}
                  >
                    <span
                      className={`text-md md:text-2xl tracking-[0.2em] uppercase text-yellow-400 ${playfairDisplayBold.className}`}
                    >
                      All Products
                    </span>
                  </div>
                </RevealOnScroll>

                <RevealOnScroll>
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
                </RevealOnScroll>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {allProducts.map((product, index) => {
                  const images = Array.isArray(product.image)
                    ? product.image
                    : [product.image];

                  const hasSecondImage = images.length > 1;

                  return (
                    <RevealOnScroll key={product.id} delay={index * 25}>
                      <Link key={product.id} href={`/products/${product.slug}`}>
                        <div className="group flex flex-col bg-white rounded-md shadow-black border-2 border-yellow-400 hover:shadow-md active:scale-95 transition-all duration-300 p-2 cursor-pointer h-full">
                          <div className="relative w-full h-40 overflow-hidden rounded">
                            <Image
                              src={images[0]}
                              alt={product.title}
                              fill
                              className={`object-cover transition-all duration-500 ${
                                hasSecondImage
                                  ? "group-hover:opacity-0 group-hover:scale-105"
                                  : "group-hover:scale-105"
                              }`}
                            />

                            {hasSecondImage && (
                              <Image
                                src={images[1]}
                                alt={product.title}
                                fill
                                className="object-cover opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                              />
                            )}
                          </div>
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
                    </RevealOnScroll>
                  );
                })}
              </div>
              {/* Pagination */}
              <RevealOnScroll>
                <div className="flex items-center justify-center gap-3 my-14">
                  {/* Tombol Previous */}
                  {visiblePages.map((page) => (
                    <Link
                      key={page}
                      href={
                        page === 1 ? "/products" : `/products/pages/${page}`
                      }
                      className={`px-4 py-2 border transition ${
                        currentPage === page
                          ? "bg-white text-black"
                          : "bg-transparent text-white hover:bg-white hover:text-black"
                      }`}
                    >
                      {page}
                    </Link>
                  ))}
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
        <FloatingLogo />
        <Footer variant="yellow" />
      </section>
    </>
  );
}
