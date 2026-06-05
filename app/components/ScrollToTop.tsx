"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Komponen utilitas untuk mengembalika posisi scroll
 * kebagian paling atas halaman setiap kali user
 * berpindah route/page di Next.js
 * 
 * Cocok digunakan untuk:
 * - Landing page
 * - E-commerce
 * - Blog
 * - Dashboard
 * - Portfolio
 * 
 * Cara kerja:
 * 1. Memantau peubahan URL menggunakan usePathname()
 * 2. Ketika route berubah, halaman otomatis scroll ke atas
 * 3. Menggunakan smooth scroll agar perpindahan teasa lebih halus
 */
export default function ScrollToTop() {
  /**
   * Mengambil pathname aktif
   * 
   * Contoh:
   * "/", "/products", dll
   */
  const pathname = usePathname();

  useEffect(() => {
    /**
     * Memberikan sedikit delay agar proses render
     * halaman baru selesai terlebih dahulu sebelum
     * melakukan scroll ke atas
     */
    const timeout = setTimeout(() => {
      try {
        /**
         * Browser modern:
         * Scroll ke atas dengan animasi halus
         */
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } catch {
        /**
         * Fallback untuk browser yang tidak
         * mendukung opsi "behavior"
         */
        window.scrollTo(0, 0);
      }
    }, 50);

    /**
     * Membersihkan timer ketika:
     * - Komponen unmount
     * - Pathname berubah kembali
     */
    return () => clearTimeout(timeout);
  }, [pathname]);

  /**
   * Komponen ini tidak menampilkan UI apa pun.
   * Hanya menjalankan efek ketika route berubah
   */
  return null;
}
