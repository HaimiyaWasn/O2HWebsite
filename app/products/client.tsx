"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
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

export default function ProductsClient({
  allProducts,
}: {
  allProducts: Products[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [productType, setProductType] = useState<string>("Semua Produk");
  const [stockStatus, setStockStatus] = useState<string>("Semua");
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const pathname = usePathname();

  const currentPage = useMemo(() => {
    const match = pathname.match(/\/products\/pages\/(\d+)/);

    return match ? Number(match[1]) : 1;
  }, [pathname]);

  const PRODUCTS_PER_PAGE = 20;
  const MAX_VISIBLE_PAGES = 5;

  const parsePrice = (price: string) => {
    return Number(price.replace(/[^0-9]/g, ""));
  };

  // FILTER
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // kategori
      if (selectedCategory && !product.label.includes(selectedCategory)) {
        return false;
      }

      // diskon
      if (productType === "Diskon" && !product.diskon) {
        return false;
      }

      // stok
      if (stockStatus === "Ada Stok" && !product.label.includes("Ada Stok")) {
        return false;
      }

      // harga
      const price = parsePrice(product.price);

      if (priceRange === "under260" && price >= 260000) {
        return false;
      }

      if (priceRange === "260-350" && (price < 260000 || price > 350000)) {
        return false;
      }

      if (priceRange === "350-450" && (price < 350000 || price > 450000)) {
        return false;
      }

      if (priceRange === "450plus" && price < 450000) {
        return false;
      }

      // size
      if (selectedSize && !product.size.includes(selectedSize)) {
        return false;
      }

      return true;
    });
  }, [
    allProducts,
    selectedCategory,
    productType,
    stockStatus,
    priceRange,
    selectedSize,
  ]);

  // TOTAL PAGE DARI FILTER
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  // PAGINATION PRODUK
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;

    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  // PAGE NUMBER
  let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));

  let endPage = startPage + MAX_VISIBLE_PAGES - 1;

  if (endPage > totalPages) {
    endPage = totalPages;

    startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
  }

  const visiblePages = Array.from(
    { length: Math.max(0, endPage - startPage + 1) },
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
              <ProductsFilter
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                productType={productType}
                setProductType={setProductType}
                stockStatus={stockStatus}
                setStockStatus={setStockStatus}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />
            </div>

            <div className="flex-1">
              <RevealOnScroll delay={300}>
                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex w-full md:w-fit items-center justify-center rounded-full shadow-sm shadow-yellow-400 border-4 border-yellow-400/40 bg-yellow-400/10 px-4 py-2 backdrop-blur-md">
                    <span
                      className={`text-md md:text-2xl tracking-[0.2em] uppercase text-yellow-400 ${playfairDisplayBold.className}`}
                    >
                      All Products
                    </span>
                  </div>

                  <p className="text-sm text-gray-400">
                    {filteredProducts.length} produk ditemukan
                  </p>
                </div>
              </RevealOnScroll>

              {/* JIKA PRODUK KOSONG */}
              {filteredProducts.length === 0 ? (
                <div className="flex items-center justify-center py-40">
                  <h1 className="text-2xl text-gray-400 font-semibold">
                    Produk tidak ditemukan
                  </h1>
                </div>
              ) : (
                <>
                  {/* GRID */}
                  <RevealOnScroll delay={750}>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {paginatedProducts.map((product) => {
                        const images = Array.isArray(product.image)
                          ? product.image
                          : [product.image];

                        const hasSecondImage = images.length > 1;

                        return (
                          <Link
                            key={product.id}
                            href={`/products/${product.slug}`}
                          >
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
                        );
                      })}
                    </div>
                  </RevealOnScroll>

                  {/* PAGINATION */}
                  {totalPages > 1 && (
                    <RevealOnScroll delay={300}>
                      <div className="flex items-center justify-center gap-3 my-14 flex-wrap">
                        {visiblePages.map((page) => (
                          <Link
                            key={page}
                            href={
                              page === 1
                                ? "/products"
                                : `/products/pages/${page}`
                            }
                            className={`px-4 py-2 border transition cursor-pointer ${
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
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <FloatingLogo />
        <Footer variant="yellow" />
      </section>
    </>
  );
}
