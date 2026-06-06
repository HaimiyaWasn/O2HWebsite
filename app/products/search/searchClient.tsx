"use client"

import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Props untuk komponen SearchProducts
 *
 * defaultSearch:
 * Nilai awal input pencarian.
 *
 * Contoh:
 * URL: /products/search?keyword=kaos
 *
 * Maka:
 * defaultSearch = "kaos"
 */
type SearchPageProps = {
  defaultSearch?: string,
}

export default function SearchProducts({ defaultSearch = "" }: SearchPageProps) {
  /**
   * Router Next.js
   *
   * Digunakan untuk berpindah halaman
   * tanpa melakukan refresh browser.
   */
  const router = useRouter();

  /**
   * State untuk menyimpan isi input pencarian.
   *
   * Nilai awal diambil dari defaultSearch
   * agar ketika user membuka halaman hasil pencarian,
   * keyword sebelumnya tetap tampil di input.
   */
  const [inputValue, setInputValue] = useState(defaultSearch);

  /**
   * Menjalankan proses pencarian.
   */
  const handleSearch = () => {
    /**
     * Membersihkan spasi di awal/akhir
     * dan mengubah menjadi huruf kecil.
     *
     * Contoh:
     * "  Kaos Oversize  "
     * menjadi
     * "kaos oversize"
     */
    const clean = inputValue.trim().toLowerCase();

    /**
     * Jika input kosong,
     * kembalikan user ke halaman semua produk.
     */
    if (!clean) {
      router.push("/products");
      return;
    };

    /**
     * Pindah ke halaman hasil pencarian.
     *
     * encodeURIComponent digunakan agar karakter
     * khusus seperti spasi atau simbol aman digunakan
     * di URL.
     *
     * Contoh:
     * "kaos putih"
     *
     * menjadi:
     * /products/search?keyword=kaos%20putih
     */
    router.push(`/products/search?keyword=${encodeURIComponent(clean)}`);
  };

  /**
   * Menjalankan pencarian ketika user
   * menekan tombol Enter pada keyboard.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  /**
   * Sinkronisasi nilai input ketika
   * defaultSearch berubah.
   *
   * Berguna saat user berpindah halaman
   * pencarian tanpa reload browser.
   */
  useEffect(() => {
    setInputValue(defaultSearch);
  }, [defaultSearch]);

  return (
    <div className="flex w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      <input
        type="text"
        placeholder="Telusuri..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className=" input w-full rounded-l-full text-black bg-yellow-100 border border-yellow-500/30 focus:border-yellow-600 focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className=" px-5 rounded-r-full bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 border border-yellow-500/30 transition"
      >
        <FaSearch size={20} />
      </button>
    </div>
  );
}
