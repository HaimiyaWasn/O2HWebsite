"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Playfair_Display } from "next/font/google";
import { FaArrowAltCircleRight } from "react-icons/fa";

import RevealOnScroll from "../components/RevealOnScroll";

/**
 * Representasi data berita
 *
 * Dapat digunakan kembali untuk:
 * - BLog
 * - News Portal
 * - Artikel
 * - Dokumentasi
 */
type News = {
  id: number; // ID unik berita
  date: string; // Tanggal publikasi
  title: string; // Judul berita
  slug: string; // URL unik berita
};

/**
 * Props yang diterima komponen NewsClient
 */
type NewsClientProps = {
  allNews: News[]; // Daftar berita pada halaman saat ini
  totalPages: number; // Total jumlah halaman yang tersedia
  currentPage: number; // Halaman yang sedang aktif
};

/**
 * Font untuk heading
 */
const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

/**
 * Font untuk teks biasa
 */
const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

/**
 * Halaman daftar berita
 *
 * Fitur:
 * - Menampilkan seluruh berita
 * - Pagination
 * - Link ke detail berita
 * - Animasi reveal saat scroll
 *
 * Cocok digunakan untuk:
 * - Blog Listing
 * - News Listing
 * - Artikel Listing
 */
export default function NewsClient({
  allNews,
  totalPages,
  currentPage,
}: NewsClientProps) {
  /**
   * Jumlah maksimal nomor halaman
   * yang ditampilkan sekaligus
   *
   * Contoh:
   * [3] [4] [5] [6] [7]
   */
  const MAX_VISIBLE_PAGES = 5;

  /**
   * Memnentukan halaman awal yang akan ditampilkan
   */
  let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));

  /**
   * Menentukan halaman akhir yang akan ditampilkan
   */
  let endPage = startPage + MAX_VISIBLE_PAGES - 1;

  /**
   * Jika halaman akhir melebihi jumlah halaman yang tersedia,
   * sesuaikan kembali
   */
  if (endPage > totalPages) {
    endPage = totalPages;

    startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
  }

  /**
   * Membuat array nomor halaman yang akan dirender
   *
   * Contoh:
   * [1, 2, 3, 4, 5]
   */
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <section className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <RevealOnScroll delay={0.05}>
          <div
            className={`inline-flex items-center rounded-full shadow-sm shadow-yellow-400 border-4 border-yellow-400/40 bg-yellow-400/10 px-4 py-2 backdrop-blur-md ${playfairDisplayBold.className}`}
          >
            <span
              className={`text-base md:text-2xl tracking-[0.2em] uppercase text-yellow-400 ${playfairDisplayBold.className}`}
            >
              All News
            </span>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <div className="divide-y divide-white/30">
            {allNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.15 + index * 0.05,
                }}
              >
                <Link
                  href={`/news/${news.slug}`}
                  className={`group flex flex-col md:flex-row md:items-center gap-2 md:gap-6 py-6 md:py-8 hover:no-underline ${playfairDisplayRegular.className}`}
                >
                  <span className="text-sm md:text-base md:w-28 md:shrink-0 group-hover:opacity-50 group-active:opacity-50">
                    {news.date}
                  </span>

                  <p className="flex-1 text-base md:text-lg leading-relaxed group-hover:opacity-50 group-active:opacity-50">
                    {news.title}
                  </p>

                  <div className="self-end md:self-auto mt-2 md:mt-8">
                    <FaArrowAltCircleRight
                      size={24}
                      className="group-hover:opacity-50 group-active:opacity-50 transition"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </RevealOnScroll>
      </div>

      <RevealOnScroll delay={0.05}>
        <div className="flex items-center justify-center gap-3 my-3">
          {visiblePages.map((page) => (
            <Link
              key={page}
              href={page === 1 ? "/news" : `/news/pages/${page}`}
              className={`px-4 py-2 border transition ${
                currentPage === page
                  ? "bg-white text-black"
                  : "bg-transparent text-white hover:bg-white hover:text-black"
              }`}
            >
              {page}
            </Link>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
