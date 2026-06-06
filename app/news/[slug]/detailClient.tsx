"use client";

import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { FaArrowAltCircleRight } from "react-icons/fa";

import RevealOnScroll from "@/app/components/RevealOnScroll";

/**
 * Representasi data berita
 * 
 * Struktur ini dapat digunakan kembali untuk:
 * - BLog
 * - Portal bertia
 * -CMS
 * - Artikel Dokumentasi 
 * - Press Release
 */
type News = {
  id: number; // ID unik berita
  date: string; // Tanggal publikasi
  title: string; // Judul Berita
  slug: string; // URL unik berita
  content: string; // Isi berita
};

/**
 * Font Playfair Display Bold digunakan untuk heading/judul utama
 */
const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

/**
 * FOnt PLayfair DIsplay Reuglar digunakan untuk teks biasa
 */
const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

/**
 * Props yang diterima oleh DetailClient
 * 
 * Berisi data berita yang akan ditampilkan
 */
type DetailNewsClientProps = {
  news: News;
};

/**
 * Komponen untuk menampilkan halaman detail berita
 * 
 * Fitur: 
 * - Menampilkan tanggal berita
 * - Menampilkan judul berita
 * - Menampilkan isi berita
 * - Animasi reveal saat scroll
 * - Tombol kembali ke daftar berita
 * 
 * Cocok digunakan untuk:
 * - Blog Detail Page
 * - News Detail Page
 * - Artikel Detail
 */
export default function DetailClient({ news }: DetailNewsClientProps) {
  return (
    <>
      <section className="pt-28 pb-5 md:pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <RevealOnScroll delay={0.3}>
            <p
              className={`text-sm opacity-60 mb-4 ${playfairDisplayRegular.className}`}
            >
              {news.date}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.5}>
            <h1 className={`text-4xl mb-10 ${playfairDisplayBold.className}`}>
              {news.title}
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={0.75}>
            <article
              className={`leading-relaxed text-lg ${playfairDisplayRegular.className}`}
            >
              {news.content}
            </article>
          </RevealOnScroll>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10 flex justify-end">
        <RevealOnScroll delay={0.3}>
          <Link
            href="/news"
            className={`flex items-center gap-2 text-sm md:text-base leading-none opacity-50 hover:opacity-100 active:opacity-100 ${playfairDisplayRegular.className}`}
          >
            Back to news
            <FaArrowAltCircleRight size={20} className="translate-y-px" />
          </Link>
        </RevealOnScroll>
      </div>
    </>
  );
}
