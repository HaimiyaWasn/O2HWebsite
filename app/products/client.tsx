"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Playfair_Display } from "next/font/google";

import { formatCurrency } from "@/lib/currencyFormatter";
import SearchProducts from "./search/searchClient";
import ProductsFilter from "./components/productsFilter";
import ProductUrutkan from "./components/productUrutkan";
import RevealOnScroll from "../components/RevealOnScroll";

/**
 * Struktur data produk.
 *
 * Sebaiknya dipindahkan ke:
 * /types/product.ts
 *
 * agar bisa digunakan ulang
 * di seluruh project.
 */
type Product = {
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

/**
 * Props yang diterima halaman produk.
 *
 * allProducts berasal dari Server Component
 * atau hasil fetch API/database.
 */
type ProductsClientProps = {
  allProducts: Product[];
};

const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

export default function ProductsClient({ allProducts }: ProductsClientProps) {
  /**
   * Router Next.js
   *
   * Digunakan untuk mengubah URL
   * tanpa refresh halaman.
   */
  const router = useRouter();

  /**
   * Mengambil semua query parameter
   * yang ada di URL saat ini.
   *
   * Contoh:
   * /products?category=Shirt&page=2
   */
  const searchParams = useSearchParams();

  /**
   * Filter yang aktif saat ini.
   *
   * Nilai diambil langsung dari URL
   * sehingga bisa dibagikan ke pengguna lain.
   */
  const selectedCategory = searchParams.get("category");
  const productType = searchParams.get("type") || "Semua Produk";
  const stockStatus = searchParams.get("stock") || "Semua";
  const priceRange = searchParams.get("priceRange");
  const selectedSize = searchParams.get("size")?.split(",") ?? [];
  const currentPage = Number(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sort") || "newest";

  /**
   * Konfigurasi pagination.
   */
  const PRODUCTS_PER_PAGE = 20;

  /**
   * Jumlah tombol halaman
   * yang ditampilkan sekaligus.
   *
   * Contoh:
   * [1] [2] [3] [4] [5]
   */
  const MAX_VISIBLE_PAGES = 5;

  /**
   * Mengubah filter dan menyimpannya
   * ke URL query parameter.
   *
   * Contoh:
   * updateFilter("category", "Shirt")
   *
   * Hasil:
   * /products?category=Shirt
   */
  const updateFilter = (key: string, value: string | string[] | null) => {
    /**
     * Menyalin query yang sedang aktif
     * agar filter lain tidak hilang.
     */
    const params = new URLSearchParams(searchParams.toString());

    /**
     * Jika filter berupa array.
     *
     * Contoh:
     * size=M,L,XL
     */
    if (Array.isArray(value)) {
      if (value.length > 0) {
        params.set(key, value.join(","));
      } else {
        params.delete(key);
      }
    } else {
      /**
       * Jika filter berupa string biasa.
       */
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }

    /**
     * Kembali ke halaman pertama
     * setiap kali filter berubah.
     */
    params.set("page", "1");

    router.push(`/products?${params.toString()}`);
  };

  /**
   * FILTER PRODUK
   *
   * useMemo digunakan agar proses filter
   * tidak dihitung ulang setiap render.
   */
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      /**
       * Filter kategori.
       */
      if (selectedCategory && !product.label.includes(selectedCategory)) {
        return false;
      }

      /**
       * Hanya produk diskon.
       */
      if (productType === "Diskon" && product.discount <= 0) {
        return false;
      }

      /**
       * Hanya produk yang masih tersedia.
       */
      if (stockStatus === "Ada Stok" && !product.label.includes("Ada Stok")) {
        return false;
      }

      /**
       * Menghitung harga setelah diskon.
       */
      const finalPrice =
        product.discount > 0
          ? product.price - (product.price * product.discount) / 100
          : product.price;

      /**
       * Filter harga.
       */
      if (priceRange === "under260" && finalPrice >= 260000) {
        return false;
      }

      if (
        priceRange === "260-350" &&
        (finalPrice < 260000 || finalPrice > 350000)
      ) {
        return false;
      }

      if (
        priceRange === "350-450" &&
        (finalPrice < 350000 || finalPrice > 450000)
      ) {
        return false;
      }

      if (priceRange === "450plus" && finalPrice < 450000) {
        return false;
      }

      if (
        selectedSize.length > 0 &&
        !selectedSize.some((size) => product.size.includes(size))
      ) {
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

  /**
   * SORTING PRODUK
   *
   * Selalu menampilkan produk yang tersedia
   * di bagian atas.
   */
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];

    products.sort((a, b) => {
      /**
       * Produk stok tersedia
       * selalu berada di atas.
       */
      if (a.isOutOfStock !== b.isOutOfStock) {
        return Number(a.isOutOfStock) - Number(b.isOutOfStock);
      }

      /**
       * Harga setelah diskon.
       */
      const aFinalPrice =
        a.discount > 0 ? a.price - (a.price * a.discount) / 100 : a.price;

      const bFinalPrice =
        b.discount > 0 ? b.price - (b.price * b.discount) / 100 : b.price;

      /**
       * Jenis sorting yang dipilih user.
       */
      switch (sortBy) {
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );

        case "price-low":
          return aFinalPrice - bFinalPrice;

        case "price-high":
          return bFinalPrice - aFinalPrice;

        case "name-asc":
          return a.title.localeCompare(b.title);

        case "name-desc":
          return b.title.localeCompare(a.title);

        case "newest":
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

    return products;
  }, [filteredProducts, sortBy]);

  /**
   * Total halaman pagination.
   */
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);

  /**
   * Mengambil produk yang akan
   * ditampilkan pada halaman saat ini.
   */
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;

    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPage]);

  /**
   * Menentukan halaman pertama
   * yang ditampilkan pada pagination.
   */
  let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));

  /**
   * Menentukan halaman terakhir
   * yang ditampilkan.
   */
  let endPage = startPage + MAX_VISIBLE_PAGES - 1;

  /**
   * Mencegah halaman melebihi
   * jumlah halaman yang tersedia.
   */
  if (endPage > totalPages) {
    endPage = totalPages;

    startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
  }

  /**
   * Array nomor halaman
   * untuk tombol pagination.
   *
   * Contoh:
   * [1,2,3,4,5]
   */
  const visiblePages = Array.from(
    { length: Math.max(0, endPage - startPage + 1) },
    (_, i) => startPage + i
  );

  return (
    <section className="pt-5 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-center items-center mb-4">
          <SearchProducts />
        </div>

        <div className="flex flex-col lg:flex-row gap-0 md:gap-6">
          <div className="w-full lg:w-60">
            <ProductsFilter
              selectedCategory={selectedCategory}
              productType={productType}
              stockStatus={stockStatus}
              priceRange={priceRange}
              selectedSize={selectedSize}
              updateFilter={updateFilter}
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4">
              <RevealOnScroll delay={0.05}>
                <div className="flex flex-col gap-4">
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

              <RevealOnScroll delay={0.1}>
                <ProductUrutkan />
              </RevealOnScroll>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="flex items-center justify-center py-40">
                <h1 className="text-2xl text-gray-400 font-semibold">
                  Produk tidak ditemukan
                </h1>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {paginatedProducts.map((product, index) => {
                    const images = Array.isArray(product.image)
                      ? product.image
                      : [product.image];

                    const hasSecondImage = images.length > 1;

                    const finalPrice =
                      product.discount > 0
                        ? product.price -
                          (product.price * product.discount) / 100
                        : product.price;

                    const isNew =
                      new Date(product.createdAt).getTime() >
                      Date.now() - 30 * 24 * 60 * 60 * 1000;

                    return (
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
                        <Link
                          href={`/products/${product.slug}`}
                          className="h-full"
                        >
                          <div
                            className={`group flex flex-col bg-white rounded-md shadow-black border-2 border-yellow-400 overflow-hidden hover:shadow-md active:scale-95 transition-all duration-300 p-2 cursor-pointer ${
                              product.isOutOfStock ? "opacity-75" : ""
                            }`}
                          >
                            <div className="relative aspect-square overflow-hidden rounded">
                              {product.isOutOfStock && (
                                <div className="absolute top-1 left-1 z-30 bg-black text-white text-[10px] px-2 py-1 rounded font-bold">
                                  Stok Habis
                                </div>
                              )}
                              {isNew && (
                                <div
                                  className={`absolute top-1 left-1 z-20 bg-black text-white text-[10px] px-1.5 py-0.5 rounded font-bold ${
                                    product.isOutOfStock ? "top-8" : "top-1"
                                  }`}
                                >
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

                              <p className="text-xs text-gray-500">
                                {product.sold}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {totalPages > 1 && (
                  <RevealOnScroll delay={0.05}>
                    <div className="flex items-center justify-center gap-3 my-14 flex-wrap">
                      {visiblePages.map((page) => {
                        const params = new URLSearchParams(
                          searchParams.toString()
                        );

                        if (page === 1) {
                          params.delete("page");
                        } else {
                          params.set("page", String(page));
                        }

                        return (
                          <Link
                            key={page}
                            href={`/products?${params.toString()}`}
                            className={`px-4 py-2 border transition cursor-pointer ${
                              currentPage === page
                                ? "bg-white text-black"
                                : "bg-transparent text-white hover:bg-white hover:text-black"
                            }`}
                          >
                            {page}
                          </Link>
                        );
                      })}
                    </div>
                  </RevealOnScroll>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
