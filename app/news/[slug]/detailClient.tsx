"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Playfair_Display } from "next/font/google"; // Font Playfair Display
import { FaArrowAltCircleRight } from "react-icons/fa"; // Ikon panah

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import FloatingLogo from "@/app/components/FABLogo";

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

// Client Component
export default function DetailClient({ news }: { news: News }) {
  // State animasi
  const [showContent, setShowContent] = useState(false);

  // Ref section
  const sectionRef = useRef<HTMLElement | null>(null);

  // Intersection Observer
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
  }, []);

  return (
    <>
      <Navbar />
      {/* Konten berita */}
      <section ref={sectionRef} className="py-12 pt-28 scroll-mt-12 md:scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <p
            className={`text-sm opacity-60 mb-4 transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              showContent
                ? "opacity-60 translate-y-0"
                : "opacity-0 translate-y-5"
            } ${playfairDisplayRegular.className}`}
            style={{
              transitionDelay: "250ms",
            }}
          >
            {news.date}
          </p>

          <h1
            className={`text-4xl mb-10 transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              showContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            } ${playfairDisplayBold.className}`}
            style={{
              transitionDelay: "350ms",
            }}
          >
            {news.title}
          </h1>

          <article
            className={`leading-relaxed text-lg transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              showContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            } ${playfairDisplayRegular.className}`}
            style={{
              transitionDelay: "500ms",
            }}
          >
            {news.content}
          </article>
        </div>
      </section>

      {/* Tombol kembali */}
      <div className="max-w-5xl mx-auto px-6 py-18 flex justify-end">
        <Link
          href="/news"
          className={`flex items-center gap-2 text-sm md:text-base leading-none transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            showContent
              ? "opacity-50 hover:opacity-100 active:opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          } ${playfairDisplayRegular.className}`}
          style={{
            transitionDelay: "650ms",
          }}
        >
          Back to news
          <FaArrowAltCircleRight size={20} className="translate-y-px" />
        </Link>
      </div>

      <Footer variant="yellow" />
      <FloatingLogo />
    </>
  );
}
