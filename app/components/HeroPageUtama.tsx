"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Bungee, Playfair_Display } from "next/font/google";
import { useDisclaimer } from "./Disclaimer/disclaimerContent";

/**
 * Font utama untuk heading Hero
 */
const bungee = Bungee({
  weight: "400",
  subsets: ["latin"],
});

/**
 * Font untuk deskripsi Hero
 */
const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

/**
 * Kalimat yang akan dtampilkan menggunakan efek typing animation
 */
const HERO_TEXT = "Together in Every Step";

/**
 * Komponen utama yang pertama kali dilihat pengunjung
 * ketika membuka website
 * 
 * Fitur: 
 * - Background image fullscreen
 * - Typing animation
 * - Fade in content
 * - Smooth scroll button
 * - Terintegrasi dengan Disclaimer
 * 
 * Cocok digunakan untuk:
 * - Landing page
 * - Company Profile
 * - Portfolio
 * - E-commerce
 * - Product Showcase
 */
export default function Hero() {
  /**
   * Menandai bahwa Hero sudah mulai aktif
   * 
   * Digunakan untuk animasi background ketika disclaimer telah diterima
   */
  const [isMounted, setIsMounted] = useState(false);

  /**
   * Menyimpan teks yang sedang diketik
   * 
   * Contoh:
   * T, To, Tog, ...
   */
  const [displayText, setDisplayText] = useState("");

  /**
   * Mengontrol kapan deskripsi dan tombol mulai ditampilkan
   */
  const [showContentUtama, setShowContentUtama] = useState(false);

  /**
   * Status disclaimer dari Context
   * 
   * Hero baru akan berjalan setelah disclaimer disetujui pengguna
   */
  const { accepted } = useDisclaimer();

  /**
   * Scroll menuju section produk
   */
  const handleScrollButton = () => {
    document
      .getElementById("card-products")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  /**
   * Menjalankan animasi Hero setelah disclaimer diterima
   * 
   * Urutan: 
   * 1. Disclaimer diterima
   * 2. Background muncul
   * 3. Menunggu 1.5 detik
   * 4. Typing animation dimulai
   * 5. Setelah selesai, tampilkan konten utama
   */
  useEffect(() => {
    if (!accepted) return;

    setIsMounted(true);

    const startTyping = setTimeout(() => {
      let index = 0;

      const typingInterval = setInterval(() => {
        setDisplayText(HERO_TEXT.slice(0, index + 1));
        index++;

        /**
         * Ketika seluruh teks selesai diketik, hentikan interval
         */
        if (index === HERO_TEXT.length) {
          clearInterval(typingInterval);

          /**
           * Tampilkan paragraf dan tombol beberapa saat setelah typing selesai
           */
          setTimeout(() => {
            setShowContentUtama(true);
          }, 300);
        }
      }, 150);
    }, 1500);

    /**
     * Membersihkan timeout saat komponen dilepas dari DOM
     */
    return () => clearTimeout(startTyping);
  }, [accepted]);

  return (
    <div
      className="hero min-h-screen relative overflow-hidden"
      id="hero-page-utama"
    >
      <Image
        src="/img/backgrounds/O2H_ImagesHero_2.jpg"
        alt="Hero background"
        fill
        priority
        className={`object-cover transition-all duration-1500 ease-in-out ${
          isMounted ? "blur-0 scale-100" : "blur-lg scale-105"
        }`}
      />

      <div className="hero-overlay bg-black/75 z-0" />
      
      <div className="hero-content text-neutral-content text-center z-10">
        <div className="max-w-3xl">
          <div
            className={`inline-flex items-center rounded-full border lg:hidden border-yellow-400/40 bg-yellow-400/10 px-4 py-2 mb-6 backdrop-blur-md transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              showContentUtama
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-4 pointer-events-none"
            } transition-all duration-700`}
          >
            <span className="text-yellow-300 text-sm tracking-[0.2em] uppercase">
              O2H Official Site
            </span>
          </div>
          <h1
            className={`mb-5 text-4xl md:text-5xl font-bold ${bungee.className}`}
          >
            {displayText}
            <span className="animate-ping text-yellow-400">|</span>
          </h1>

          <p
            className={`mb-5 md:text-xl transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              showContentUtama
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-5 pointer-events-none"
            } ${playfairDisplayRegular.className}`}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima
            quae assumenda architecto. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Praesentium nesciunt distinctio sit quos quas
            repudiandae ullam exercitationem, enim autem minima. Quaerat ullam,
            aut explicabo assumenda possimus laborum cum blanditiis vero!
          </p>

          <button
            onClick={handleScrollButton}
            disabled={!showContentUtama}
            className={`btn bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-black text-lg rounded-2xl transform-gpu transition-all duration-700 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              showContentUtama
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            } ${bungee.className}`}
          >
            Let's Explore
          </button>
        </div>
      </div>
    </div>
  );
}
