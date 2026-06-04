"use client";

import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { FaArrowAltCircleRight } from "react-icons/fa";

import RevealOnScroll from "@/app/components/RevealOnScroll";

type News = {
  id: number;
  date: string;
  title: string;
  slug: string;
  content: string;
};

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
};

export default function DetailClient({ news }: DetailNewsClientProps) {
  return (
    <>
      <section className="pt-28 min-h-screen">
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

      <div className="max-w-7xl mx-auto px-6 py-10 flex justify-end">
        <RevealOnScroll>
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
