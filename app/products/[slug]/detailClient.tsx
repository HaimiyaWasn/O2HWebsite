"use client";

import { useState } from "react";
import { Playfair_Display } from "next/font/google";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import RevealOnScroll from "@/app/components/RevealOnScroll";
import ProductDescriptionModal from "../components/productDescriptionModal";
import ProductImageSlider from "../components/productImageSlider";
import ProductCardRekomendasi from "../components/productCardRekomendasi";

/**
 * Struktur data produk
 *
 * Dapat digunakan kembali untuk:
 * - E-commerce
 * - Marketplace
 * - Catalog Product
 * - Inventory System
 */
type Product = {
  id: number; // ID unik produk
  title: string; // Nama produk
  price: number; // Harga asli produk
  label: string[]; // Label produk (Best seller, Limited, dll)
  image: string[]; // Daftar gambar produk
  deskripsi: string; // Deskripsi lengkap produk
  sold: string; // Informasi jumlah terjual
  isOutOfStock: boolean; // Status stok
  size: string[]; // Daftar ukuran produk
  discount: number; // Discount
  createdAt: string; // Tanggal produk dibuat
  slug: string; // URL unik produk
};

const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

/**
 * Props yang diterima halaman detail produk
 *
 * product  -> produk yang sedang dibuka
 * products -> seluruh produk untuk rekomendasi
 */
type DetailProductsClientProps = {
  product: Product;
  products: Product[];
};

export default function DetailClient({
  product,
  products,
}: DetailProductsClientProps) {
  const [showFullDescription, setShowFullDescription] = useState(false); // Mengontrol modal deskripsi lengkap

  /**
   * Menyimpan status favorit produk
   *
   * Saat ini hanya state lokal
   * Jika ingin tersimpan permanen, hubungkan dengan database atau API
   */
  const [isFavorite, setIsFavorite] = useState(false);

  /**
   * Membatasi deskripsi agar tidak terlalu panjang
   *
   * Jika lebih dari 275 karakter,
   * tampilkan sebagian lalu tambahkan "..."
   */
  const shortDescription =
    product.deskripsi.length > 275
      ? product.deskripsi.slice(0, 275) + "..."
      : product.deskripsi;

  /**
   * Menghitung harga akhir setelah diskon
   */
  const finalPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  /**
   * Menentukan apakah produk masih dianggap baru
   *
   * Produk dianggap NEW jika dibuat dalam 30 hari terakhir
   */
  const isNew =
    new Date(product.createdAt).getTime() >
    Date.now() - 30 * 24 * 60 * 60 * 1000;

  /**
   * Formatter mata uang Rupiah
   * 
   * Bisa digunakan kembali di seluruh project
   * agar format harga konsisten
   */
  const currencyFormater = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return (
    <>
      <section className="min-h-screen py-12 pt-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <RevealOnScroll delay={0.3}>
              <ProductImageSlider
                imageProduct={
                  Array.isArray(product.image) ? product.image : [product.image]
                }
                titleProduct={product.title}
              />
            </RevealOnScroll>

            <RevealOnScroll delay={0.5}>
              <div className="flex flex-col mb-5 md:mb-7">
                <div className="flex flex-wrap gap-2 mb-4">
                  {isNew && (
                    <div className="px-3 py-1 text-xs md:text-sm rounded-md bg-black text-white border border-white font-bold">
                      NEW
                    </div>
                  )}
                  {product.isOutOfStock && (
                    <div className="px-3 py-1 text-xs md:text-sm rounded-md bg-gray-500 text-white border border-white font-bold">
                      Stock Habis
                    </div>
                  )}
                  {product.label.map((item, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 text-xs md:text-sm rounded-md bg-yellow-400 text-black border border-white ${playfairDisplayBold.className}`}
                    >
                      {item}
                    </span>
                  ))}
                  {product.discount > 0 && (
                    <div className="px-3 py-1 text-xs md:text-sm rounded-md bg-red-500 text-white border border-white font-bold">
                      -{product.discount}%
                    </div>
                  )}
                </div>
                <span
                  className={`text-xl md:text-3xl mb-3 ${playfairDisplayBold.className}`}
                >
                  {product.title}
                </span>

                <div className="flex flex-row gap-3 items-center justify-between mb-2">
                  <div className="flex flex-col">
                    {product.discount > 0 ? (
                      <>
                        <p className="text-xs text-gray-400 line-through">
                          {currencyFormater.format(product.price)}
                        </p>
                        <p className="text-lg md:text-xl text-yellow-500 font-semibold">
                          {currencyFormater.format(finalPrice)}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-lg md:text-xl text-yellow-500 font-semibold">
                          {currencyFormater.format(product.price)}
                        </p>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="group btn btn-sm rounded-xl bg-transparent border-none hover:bg-yellow-400 active:bg-yellow-400 transition-all duration-300"
                  >
                    {isFavorite ? (
                      <FaHeart
                        size={20}
                        className="text-yellow-400 group-hover:text-black group-active:text-black transition-all duration-300"
                      />
                    ) : (
                      <FaRegHeart
                        size={20}
                        className="text-yellow-400 group-hover:text-black group-active:text-black transition-all duration-300"
                      />
                    )}
                  </button>
                </div>

                <span className="text-sm opacity-65 mb-7">{product.sold}</span>

                <div className="mb-7">
                  <button
                    disabled={product.isOutOfStock}
                    className={`btn btn-lg w-full rounded-xl border border-white ${
                      playfairDisplayBold.className
                    }
                    ${
                      product.isOutOfStock
                        ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                        : "bg-yellow-400 text-black hover:bg-yellow-300 active:bg-yellow-300 transition-all duration-300"
                    }`}
                  >
                    {product.isOutOfStock
                      ? "Stock Habis"
                      : "Tambah ke Keranjang"}
                  </button>
                </div>

                <div className="bg-base-200 rounded-2xl p-5 border border-yellow-300">
                  <span
                    className={`block text-lg mb-4 text-yellow-400 ${playfairDisplayBold.className}`}
                  >
                    Product Description
                  </span>
                  <p
                    className={`whitespace-pre-line leading-7 text-sm md:text-base opacity-90 ${playfairDisplayRegular.className}`}
                  >
                    {shortDescription}
                  </p>

                  {product.deskripsi.length > 275 && (
                    <button
                      onClick={() => setShowFullDescription(true)}
                      className="mt-4 text-yellow-400 hover:text-yellow-300 transition-all duration-300 text-sm font-semibold"
                    >
                      Baca Selengkapnya
                    </button>
                  )}
                </div>
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={0.3}>
            <ProductCardRekomendasi
              product={products}
              currentProductId={product.id}
            />
          </RevealOnScroll>
        </div>
      </section>

      <ProductDescriptionModal
        openDescription={showFullDescription}
        closeDescription={() => setShowFullDescription(false)}
        description={product.deskripsi}
      />
    </>
  );
}
