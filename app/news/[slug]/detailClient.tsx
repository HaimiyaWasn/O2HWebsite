"use client";

import Link from "next/link";
import { Playfair_Display } from "next/font/google"; // Font Playfair Display
import { FaArrowAltCircleRight } from "react-icons/fa"; // Ikon panah

import Navbar from "@/app/components/NavbarO2H";
import Footer from "@/app/components/Footer";
import FloatingLogo from "@/app/components/FloatingLogo";
import RevealOnScroll from "@/app/components/RevealOnScroll";

// Tipe data berita
type News = {
  id: number;
  date: string;
  title: string;
  slug: string;
  content: string;
};

// Konfigurasi font Playfair Display untuk judul dan konten
const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

type DetailNewsClientProps = {
  news: News;
}

// Client Component
export default function DetailClient({ news }: DetailNewsClientProps) {
  return (
    <>
      <Navbar />
      {/* Konten berita */}
      <section className="py-12 pt-28 scroll-mt-12 md:scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <RevealOnScroll>
            <p
              className={`text-sm opacity-60 mb-4 ${playfairDisplayRegular.className}`}
            >
              {news.date}
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <h1 className={`text-4xl mb-10 ${playfairDisplayBold.className}`}>
              {news.title}
            </h1>
          </RevealOnScroll>

          <RevealOnScroll>
            <article
              className={`leading-relaxed text-lg ${playfairDisplayRegular.className}`}
            >
              {news.content}
            </article>
          </RevealOnScroll>
        </div>
      </section>

      {/* Tombol kembali */}
      <div className="max-w-5xl mx-auto px-6 py-18 flex justify-end">
        <RevealOnScroll>
          <Link
            href="/news"
            className={`flex items-center gap-2 text-sm md:text-base leading-none ${playfairDisplayRegular.className}`}
          >
            Back to news
            <FaArrowAltCircleRight size={20} className="translate-y-px" />
          </Link>
        </RevealOnScroll>
      </div>

      <Footer variant="yellow" />
      <FloatingLogo />
    </>
  );
}
