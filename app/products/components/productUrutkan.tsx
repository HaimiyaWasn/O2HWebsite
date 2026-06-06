"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Playfair_Display } from "next/font/google";

/**
 * Font untuk judul / label
 */
const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

/**
 * Font untuk isi dropdown
 */
const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

/**
 * Komponen untuk mengurutkan daftar produk.
 *
 * Fitur:
 * - Mengubah parameter URL (?sort=...)
 * - Reset halaman ke page 1 saat urutan berubah
 * - Mempertahankan query parameter lain yang sudah ada
 *
 * Contoh:
 *
 * Sebelum:
 * /products?page=3&category=shirt
 *
 * Setelah memilih "Harga Tertinggi":
 * /products?page=1&category=shirt&sort=price-high
 */
export default function ProductUrutkan() {
  /**
   * Router Next.js untuk berpindah URL
   * tanpa melakukan refresh halaman penuh.
   */
  const router = useRouter();

  /**
   * Mengambil query parameter yang sedang aktif.
   *
   * Contoh URL:
   * /products?sort=price-high&page=2
   */
  const searchParams = useSearchParams();

  /**
   * Nilai sorting yang sedang aktif.
   *
   * Jika URL belum memiliki parameter sort,
   * gunakan "newest" sebagai default.
   */
  const sortBy = searchParams.get("sort") || "newest";

  /**
   * Dipanggil ketika user memilih opsi sorting baru.
   *
   * Langkah:
   * 1. Salin seluruh query parameter yang ada.
   * 2. Ubah nilai "sort".
   * 3. Reset halaman ke page 1.
   * 4. Update URL.
   */
  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", value); // Simpan jenis sorting yang dipilih
    params.set("page", "1"); // Saat sorting berubah, kembali ke halaman pertama

    router.push(`/products?${params.toString()}`); // Update URL tanpa reload penuh
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
