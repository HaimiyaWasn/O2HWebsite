"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Playfair_Display } from "next/font/google"; // Font
import { FaArrowAltCircleRight } from "react-icons/fa"; // Icon panah

import Navbar from "../components/Navbar";
import FloatingLogo from "../components/FloatingLogo";
import Footer from "../components/Footer";

// Tipe data berita
type News = {
  id: number;
  date: string;
  title: string;
  slug: string;
  content: string;
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

// Halaman semua berita
export default function NewsClient({
  allNews,
  totalPages,
  currentPage,
}: {
  allNews: News[];
  totalPages: number;
  currentPage: number;
}) {
  // State untuk animasi saat section masuk viewport
  const [showContent, setShowContent] = useState(false);

  // Ref section untuk Intersection Observer
  const sectionRef = useRef<HTMLElement | null>(null);

  // Observer untuk animasi saat masuk viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowContent(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -90px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  });

  // Pagination
  const MAX_VISIBLE_PAGES = 5;

  // Hitung halaman yang akan ditampilkan
  let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));

  // Pastikan halaman akhir tidak melebihi total halaman
  let endPage = startPage + MAX_VISIBLE_PAGES - 1;

  // Jika halaman akhir melebihi total halaman, geser startPage ke kiri
  if (endPage > totalPages) {
    endPage = totalPages;

    startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
  }

  // Membuat array halaman yang akan ditampilkan
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <>
      <title>News | O2H Official Site</title>
      <Navbar />
      <section ref={sectionRef} className="py-20 scroll-mt-12 md:scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <h1
              className={`text-3xl md:text-4xl transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                showContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              } ${playfairDisplayBold.className}`}
            >
              All News
            </h1>

            <Link
              href="/"
              className={`flex items-center gap-2 text-sm md:text-base leading-none transform-gpu transition-all duration-700 ease-[cubic-bezier(0.15,1,0.3,1)] ${
                showContent
                  ? "opacity-50 hover:opacity-100 active:opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              } ${playfairDisplayRegular.className}`}
            >
              Back to home
              <FaArrowAltCircleRight size={20} className="translate-y-px" />
            </Link>
          </div>

          {/* List berita */}
          <div className="divide-y divide-white/30">
            {/* Menampilkan daftar berita */}
            {allNews.map((news, index) => (
              <Link
                key={news.id}
                href={`/news/${news.slug}`}
                className={`group flex flex-col md:flex-row md:items-center gap-2 md:gap-6 py-6 md:py-8 hover:no-underline transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  showContent
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                } ${playfairDisplayRegular.className}`}
                style={{
                  transitionDelay: `${250 + index * 150}ms`,
                }}
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
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-3 my-3">
          {/* Tombol Previous */}
          {visiblePages.map((page) => (
            <Link
              key={page}
              href={page === 1 ? "/news" : `/news/page/${page}`}
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
      </section>

      <Footer variant="yellow" />
      <FloatingLogo />
    </>
  );
}
