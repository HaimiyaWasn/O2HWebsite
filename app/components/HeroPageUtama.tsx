"use client";

import { useState, useEffect } from "react"; // Import hooks React
import Image from "next/image"; // Import Image dari Next.js
import { Bungee, Playfair_Display } from "next/font/google"; // Import font dari Google Fonts

// Konfigurasi font Bungee dan Playfair Display
const bungee = Bungee({
  weight: "400",
  subsets: ["latin"],
});
const playfairDisplayRegular = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

// Komponen utama Hero Section
export default function Hero() {
  const [isMounted, setIsMounted] = useState(false); // State untuk mengontrol efek blur dan scale pada gambar latar belakang
  const [displayText, setDisplayText] = useState(""); // State untuk menyimpan teks yang akan ditampilkan dengan efek mengetik
  const fullText = "Together in Every Step"; // Teks lengkap yang akan ditampilkan dengan efek mengetik
  const [showContentUtama, setShowContentUtama] = useState(false); // State untuk mengontrol apakah teks konten sudah ditampilkan atau belum

  // Fungsi untuk menangani klik pada tombol "Let's Explore" yang akan menggulir ke bagian "Latest News" dengan efek scroll yang halus
  const handleScrollButton = () => {
    const section = document.getElementById("latest-news"); // Mendapatkan elemen dengan ID "latest-news" dan menggulir ke sana dengan efek scroll yang halus
    section?.scrollIntoView({ behavior: "smooth" }); // Menggunakan optional chaining untuk memastikan bahwa section tidak null sebelum memanggil scrollIntoView
  };

  // useEffect untuk memulai efek mengetik setelah komponen ter-mount
  useEffect(() => {
    setIsMounted(true); // Setelah komponen ter-mount, atur isMounted ke true untuk memicu efek transisi pada gambar latar belakang
    // Mulai efek mengetik setelah delay 1.5 detik
    const startTyping = setTimeout(() => {
      let index = 0; // Index untuk melacak posisi karakter yang sedang ditampilkan
      // Interval untuk menampilkan karakter satu per satu setiap 150ms
      const typingInterval = setInterval(() => {
        setDisplayText(fullText.slice(0, index + 1)); // Perbarui displayText dengan menambahkan karakter berikutnya dari fullText
        index++; // Tingkatkan index untuk menampilkan karakter berikutnya pada iterasi berikutnya
        // Jika semua karakter sudah ditampilkan, hentikan interval dan tampilkan konten utama setelah delay 300ms
        if (index === fullText.length) {
          clearInterval(typingInterval); // Hentikan interval ketika semua karakter sudah ditampilkan
          setTimeout(() => {
            setShowContentUtama(true); // Tampilkan konten utama setelah delay 300ms setelah efek mengetik selesai
          }, 300);
        }
      }, 150); // Tampilkan karakter baru setiap 150ms
    }, 1500); // Mulai efek mengetik setelah delay 1.5 detik

    return () => clearTimeout(startTyping); // Bersihkan timeout saat komponen unmount untuk mencegah memory leak
  }, []);

  // useEffect untuk mengatur isMounted ke true setelah komponen ter-mount untuk memicu efek transisi pada gambar latar belakang
  useEffect(() => {
    setIsMounted(true); // Setelah komponen ter-mount, atur isMounted ke true untuk memicu efek transisi pada gambar latar belakang
  }, []);

  return (
    // Container utama untuk hero section dengan gambar latar belakang, overlay, dan konten teks
    <div className="hero min-h-screen relative overflow-hidden" id="hero-page-utama">
      <Image
        src="/img/backgrounds/O2H_ImagesHero_2.jpg"
        alt="Hero background"
        fill // Menggunakan fill untuk membuat gambar mengisi seluruh container hero
        priority
        className={`object-cover transition-all duration-1500 ease-in-out ${
          isMounted ? "blur-0 scale-100" : "blur-lg scale-105" // Efek blur dan scale pada gambar latar belakang yang berubah saat isMounted berubah
        }`}
      />

      {/* Overlay gelap di atas background */}
      <div className="hero-overlay bg-opacity-60 z-0" />

      {/* Koneten utama */}
      <div className="hero-content text-neutral-content text-center z-10">
        <div className="max-w-3xl">
          {/* Judul utama */}
          <h1
            className={`mb-5 text-4xl md:text-5xl font-bold ${bungee.className}`}
          >
            {displayText}
            <span className="animate-ping">|</span>
          </h1>
          {/* Deskripsi */}
          <p
            className={`mb-5 md:text-xl transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              showContentUtama // Tampilkan teks deskripsi dengan efek transisi setelah showContentUtama menjadi true, dengan perubahan opacity dan translate-y untuk efek muncul dari bawah
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-5 pointer-events-none"
            } ${playfairDisplayRegular.className}`}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima
            quae assumenda architecto, quidem deserunt nihil modi in aliquid?
            Ducimus saepe facilis commodi totam vel maiores quis iusto nobis
            mollitia iste!
          </p>
          {/* Button CTA */}
          <button
            onClick={handleScrollButton} // Menangani klik pada tombol untuk menggulir ke bagian "Latest News"
            disabled={!showContentUtama} // Menonaktifkan tombol sampai konten utama ditampilkan untuk memastikan pengguna tidak dapat mengklik tombol sebelum teks utama muncul
            className={`btn bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-black font-bold rounded-xl transform-gpu transition-all duration-700 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              showContentUtama // Tampilkan tombol dengan efek transisi setelah showContentUtama menjadi true, dengan perubahan opacity dan translate-y untuk efek muncul dari bawah, serta delay untuk memberikan efek yang lebih halus
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            } ${bungee.className}`}
          >
            Let's Eksplore
          </button>
        </div>
      </div>
    </div>
  );
}
