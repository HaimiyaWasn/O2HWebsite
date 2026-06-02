"use client";

import { Playfair_Display } from "next/font/google";

const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});
const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

export default function ProductUrutkan() {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className={`font-semibold whitespace-nowrap ${playfairDisplayBold.className}`}>Urutkan:</span>
      <select className={`select border border-yellow-400 rounded-xl px-4 py-2 outline-none w-full md:w-60 ${playfairDisplayRegular.className}`}>
        <option>Terbaru</option>
        <option>Terlama</option>
        <option>Harga Terendah</option>
        <option>Harga Tertinggi</option>
        <option>Nama Produk (A-Z)</option>
        <option>Nama Produk (Z-A)</option>
      </select>
    </div>
  );
}
