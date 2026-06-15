"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

import RevealOnScroll from "../components/RevealOnScroll";

/**
 * Struktur data produk favorit.
 *
 * Data ini berasal dari API products,
 * kemudian hanya produk yang memiliki
 * isFavorite = true yang akan ditampilkan.
 */
type ProductFavorite = {
  id: number;
  title: string;
  price: number;
  image: string[];
  isFavorite: boolean;
  size: string[];
  discount: number;
  slug: string;
};

/**
 * Font untuk judul halaman dan nama produk.
 */
const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

/**
 * Halaman daftar produk favorit.
 *
 * Fitur:
 * - Mengambil data produk dari API
 * - Menampilkan hanya produk favorit
 * - Menampilkan harga setelah diskon
 * - Menghapus produk dari daftar favorit (hanya state lokal)
 * - Animasi saat elemen muncul di layar
 *
 * Cocok digunakan untuk:
 * - Wishlist
 * - Favorite Products
 * - Saved Items
 * - Bookmark Products
 */
export default function FavoriteContent() {
  /**
   * Menyimpan daftar produk favorit.
   */
  const [favorites, setFavorites] = useState<ProductFavorite[]>([]);

  /**
   * Mengambil data produk saat halaman pertama kali dibuka.
   */
  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch("/api/products");
      const data: ProductFavorite[] = await res.json();

      /**
       * Ambil hanya produk yang ditandai sebagai favorit.
       */
      setFavorites(data.filter((item) => item.isFavorite));
    }

    fetchProduct();
  }, []);

  /**
   * Menghapus produk dari daftar favorit.
   *
   * Saat ini hanya menghapus dari state React.
   * Jika menggunakan database/API,
   * sebaiknya kirim request DELETE atau PATCH.
   */
  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section className="pt-14 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <RevealOnScroll delay={0.05}>
          <div className="inline-flex items-center rounded-full shadow-sm shadow-yellow-400 border-4 border-yellow-400/40 bg-yellow-400/10 px-4 py-2 backdrop-blur-md">
            <span
              className={`text-base md:text-2xl tracking-[0.2rem] uppercase text-yellow-400 ${playfairDisplayBold.className}`}
            >
              Favorite Saya
            </span>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="space-y-4 mt-8">
            {favorites.length === 0 && (
              <div className="text-center py-20">
                <h2
                  className={`text-2xl text-yellow-400 ${playfairDisplayBold.className}`}
                >
                  Favorite Kosong
                </h2>
                <p className="opacity-60 mt-3">
                  Belum ada produk yang ditambahkan ke favorite.
                </p>
              </div>
            )}

            {favorites.map((product) => {
              const finalPrice =
                product.price - (product.price * product.discount) / 100;

              return (
                <div
                  key={product.id}
                  className="bg-base-200 rounded-2xl p-5 border border-yellow-400/30"
                >
                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="w-32 h-40 bg-white rounded-xl overflow-hidden shrink-0 mx-auto md:mx-0">
                      <Image
                        src={product.image[0]}
                        alt={product.title}
                        width={120}
                        height={160}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <h2
                        className={`text-lg mb-2 ${playfairDisplayBold.className}`}
                      >
                        {product.title}
                      </h2>
                      <p className="text-sm opacity-70">
                        Size: {product.size.join(", ")}
                      </p>
                      {product.discount > 0 && (
                        <div className="badge badge-outline badge-warning mt-3">
                          Diskon Rp{" "}
                          {(
                            (product.price * product.discount) /
                            100
                          ).toLocaleString("id-ID")}
                        </div>
                      )}

                      <div className="mt-5 flex justify-center md:justify-start gap-5 text-sm flex-wrap">
                        <button className="hover:text-yellow-400 active:text-yellow-400 transition-all duration-300">
                          Tambahkan ke Keranjang
                        </button>
                        <button onClick={() => removeFavorite(product.id)} className="text-red-500">
                          Hapus Favorite
                        </button>
                      </div>
                    </div>

                    <div className="text-center md:text-right border-t md:border-0 pt-4 md:pt-0 border-yellow-400/20">
                      {product.discount > 0 && (
                        <p className="text-sm line-through opacity-40">
                          Rp {product.price.toLocaleString("id-ID")}
                        </p>
                      )}
                      <p className="text-xl font-bold text-yellow-400">
                        Rp {finalPrice.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
