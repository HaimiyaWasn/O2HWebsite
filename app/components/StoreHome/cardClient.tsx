"use client";

import Image from "next/image"; // Import Image dari Next.js
import { Playfair_Display } from "next/font/google"; // Import font Playfair Display dari Google Fonts


// Konfigurasi font Playfair Display
const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

// Komponen HomeProductCard untuk menampilkan informasi produk dalam bentuk kartu
export default function HomeProductCard({ product }: any) {
  return (
    // Container utama untuk kartu produk dengan latar belakang putih, bayangan, dan efek hover
    <div className="bg-white rounded-md shadow-white hover:shadow-md active:scale-95 transition-all duration-300 p-2 cursor-pointer flex flex-col h-full">
      {/* Gambar produk */}
      <Image
        src={product.image}
        alt={product.title}
        width={300}
        height={300}
        className="w-full h-40 object-cover rounded"
      />
      {/* Garis pembatas + konten */}
      <div className="border-t border-yellow-400 my-3">
        {/* Judul produk */}
        <p
          className={`text-sm mt-2 line-clamp-2 text-black ${playfairDisplayBold.className}`}
        >
          {product.title}
        </p>
        {/* Harga produk */}
        <p className="text-yellow-500 mt-1 font-semibold">{product.price}</p>
        {/* Info jumlah terjual */}
        <p className="text-xs text-gray-500">{product.sold}</p>
      </div>
    </div>
  );
}
