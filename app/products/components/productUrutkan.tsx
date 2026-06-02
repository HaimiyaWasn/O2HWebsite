"use client";

import { useRouter, useSearchParams } from "next/navigation";
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
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortBy = searchParams.get("sort") || "newest";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", value);
    params.set("page", "1");

    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-3 mb-3">
      <span
        className={`font-semibold whitespace-nowrap ${playfairDisplayBold.className}`}
      >
        Urutkan:
      </span>
      <select
        value={sortBy}
        onChange={(e) => handleChange(e.target.value)}
        className={`select border border-yellow-400 rounded-xl px-4 py-2 outline-none w-full md:w-60 ${playfairDisplayRegular.className}`}
      >
        <option value="newest">Terbaru</option>
        <option value="oldest">Terlama</option>
        <option value="price-low">Harga Terendah</option>
        <option value="price-high">Harga Tertinggi</option>
        <option value="name-asc">Nama Produk (A-Z)</option>
        <option value="name-desc">Nama Produk (Z-A)</option>
      </select>
    </div>
  );
}
