"use client";

import Image from "next/image";
import { Playfair_Display } from "next/font/google"; // Font Playfair Display

// Konfigurasi font
const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

// Card produk
export default function HomeProductCard({ product }: any) {
  return (
    <div className="bg-white rounded-md shadow-black border-2 border-yellow-400 hover:shadow-md active:scale-95 transition-all duration-300 p-2 cursor-pointer flex flex-col h-full">
      {/* Gambar produk */}
      <Image
        src={product.image}
        alt={product.title}
        width={300}
        height={300}
        className="w-full h-40 object-cover rounded"
      />

      {/* Konten produk */}
      <div className="border-t border-yellow-400 my-3">
        <p
          className={`text-sm mt-2 line-clamp-2 text-black ${playfairDisplayBold.className}`}
        >
          {product.title}
        </p>

        <p className="text-yellow-500 mt-1 font-semibold">{product.price}</p>

        <p className="text-xs text-gray-500">{product.sold}</p>
      </div>
    </div>
  );
}
