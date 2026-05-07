"use client";

import { useState, useEffect } from "react"; // React hooks
import Image from "next/image"; // Komponen gambar
import { Bungee, Playfair_Display } from "next/font/google"; // Google Fonts

// Konfigurasi font
const bungee = Bungee({
  weight: "400",
  subsets: ["latin"],
});

const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

// Hero section utama
export default function Hero() {
  // State animasi
  const [isMounted, setIsMounted] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [showContentUtama, setShowContentUtama] = useState(false);

  const fullText = "Together in Every Step";

  // Scroll ke Latest News
  const handleScrollButton = () => {
    document
      .getElementById("latest-news")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // Efek mengetik
  useEffect(() => {
    setIsMounted(true);

    const startTyping = setTimeout(() => {
      let index = 0;

      const typingInterval = setInterval(() => {
        setDisplayText(fullText.slice(0, index + 1));
        index++;

        if (index === fullText.length) {
          clearInterval(typingInterval);

          setTimeout(() => {
            setShowContentUtama(true);
          }, 300);
        }
      }, 150);
    }, 1500);

    return () => clearTimeout(startTyping);
  }, []);

  return (
    <div
      className="hero min-h-screen relative overflow-hidden"
      id="hero-page-utama"
    >
      {/* Background */}
      <Image
        src="/img/backgrounds/O2H_ImagesHero_2.jpg"
        alt="Hero background"
        fill
        priority
        className={`object-cover transition-all duration-1500 ease-in-out ${
          isMounted ? "blur-0 scale-100" : "blur-lg scale-105"
        }`}
      />

      {/* Overlay */}
      <div className="hero-overlay bg-opacity-60 z-0" />

      {/* Konten utama */}
      <div className="hero-content text-neutral-content text-center z-10">
        <div className="max-w-3xl">
          {/* Judul */}
          <h1
            className={`mb-5 text-4xl md:text-5xl font-bold ${bungee.className}`}
          >
            {displayText}
            <span className="animate-ping">|</span>
          </h1>

          {/* Deskripsi */}
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

          {/* Tombol CTA */}
          <button
            onClick={handleScrollButton}
            disabled={!showContentUtama}
            className={`btn bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-black font-bold rounded-xl transform-gpu transition-all duration-700 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
