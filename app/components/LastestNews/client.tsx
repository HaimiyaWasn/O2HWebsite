"use client";

import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa"; // Ikon panah
import { Playfair_Display } from "next/font/google"; // Font Playfair Display

import RevealOnScroll from "../RevealOnScroll";

// Tipe data berita
type News = {
  id: number;
  date: string;
  title: string;
  slug: string;
};

// Konfigurasi font
const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

type NewsClientProps = {
  latestNews: News[];
}

// Komponen untuk menampilkan berita terbaru
export default function LatestNewsClient({
  latestNews,
}: NewsClientProps) {
  return (
    <section className="py-10" id="latest-news">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <RevealOnScroll delay={300}>
            <div
              className={`inline-flex items-center rounded-full shadow-sm shadow-yellow-400 border-4 border-yellow-400/40 bg-yellow-400/10 px-4 py-2 backdrop-blur-md ${playfairDisplayBold.className}`}
            >
              <span
                className={`text-md md:text-2xl tracking-[0.2em] uppercase text-yellow-400 ${playfairDisplayBold.className}`}
              >
                Latest News
              </span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={500}>
            <Link
              href="/news"
              className={`flex items-center gap-2 text-sm md:text-base leading-none opacity-50 hover:opacity-100 active:opacity-100 ${playfairDisplayRegular.className}`}
            >
              View More
              <FaArrowAltCircleRight size={20} className="translate-y-px" />
            </Link>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={750}>
          <div className="divide-y divide-white/30">
            {/* Menampilkan daftar berita */}
            {latestNews.map((news) => (
              <Link
                key={news.id}
                href={`/news/${news.slug}`}
                className={`group flex flex-col md:flex-row md:items-center gap-2 md:gap-6 py-6 md:py-8 hover:no-underline ${playfairDisplayRegular.className}`}
              >
                <span className="text-sm md:text-base md:w-28 md:shrink-0 group-hover:opacity-50 group-active:opacity-50">
                  {news.date}
                </span>

                <p className="flex-1 text-base md:text-lg leading-relaxed group-hover:opacity-50 group-active:opacity-50">
                  {news.title}
                </p>

                <div className="self-end md:self-auto mt-2 md:mt-0">
                  <FaArrowAltCircleRight
                    size={24}
                    className="group-hover:opacity-50 group-active:opacity-50 transition"
                  />
                </div>
              </Link>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
