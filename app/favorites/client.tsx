"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

import RevealOnScroll from "../components/RevealOnScroll";

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

const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

export default function FavoriteContent() {
  const [favorites, setFavorites] = useState<ProductFavorite[]>([]);

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch("/api/products");
      const data: ProductFavorite[] = await res.json();

      setFavorites(data.filter((item) => item.isFavorite));
    }

    fetchProduct();
  }, []);

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
                <div>
                  <div></div>
                </div>
              );
            })}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
