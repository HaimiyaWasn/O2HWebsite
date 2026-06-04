"use client";

import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { FaArrowAltCircleRight } from "react-icons/fa";

import RevealOnScroll from "../components/RevealOnScroll";

type News = {
  id: number;
  date: string;
  title: string;
  slug: string;
  content: string;
};

type NewsClientProps = {
  allNews: News[];
  totalPages: number;
  currentPage: number;
};

const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

export default function NewsClient({
  allNews,
  totalPages,
  currentPage,
}: NewsClientProps) {
  const MAX_VISIBLE_PAGES = 5;

  let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));

  let endPage = startPage + MAX_VISIBLE_PAGES - 1;

  if (endPage > totalPages) {
    endPage = totalPages;

    startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
  }

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <>
      <title>News | O2H Official Site</title>
      <section className="py-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <RevealOnScroll delay={300}>
            <div
              className={`inline-flex items-center rounded-full shadow-sm shadow-yellow-400 border-4 border-yellow-400/40 bg-yellow-400/10 px-4 py-2 backdrop-blur-md ${playfairDisplayBold.className}`}
            >
              <span
                className={`text-md md:text-2xl tracking-[0.2em] uppercase text-yellow-400 ${playfairDisplayBold.className}`}
              >
                All News
              </span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={750}>
            {/* List berita */}
            <div className="divide-y divide-white/30">
              {/* Menampilkan daftar berita */}
              {allNews.map((news, index) => (
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

                  <div className="self-end md:self-auto mt-2 md:mt-8">
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

        <RevealOnScroll delay={300}>
          {/* Pagination */}
          <div className="flex items-center justify-center gap-3 my-3">
            {/* Tombol Previous */}
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
    </>
  );
}
