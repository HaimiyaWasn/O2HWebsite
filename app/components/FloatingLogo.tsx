"use client";

import { useEffect, useState } from "react"; // Import hooks React
import Link from "next/link"; // Import Link dari Next.js untuk navigasi antar halaman
import Image from "next/image"; // Import Image dari Next.js untuk menampilkan gambar logo
import O2HLogo from "../../public/img/logos/O2H_Logos_2.png"; // Import logo O2H untuk ditampilkan pada komponen FloatingLogo

// Kompomen utama FloatingLogo
export default function FloatingLogo() {
  const [rotation, setRotation] = useState(0); // State untuk menyimpan nilai rotasi

  // Fungsi untuk menangani klik pada logo yang akan menggulir ke bagian "hero-page-utama" dengan efek scroll yang halus
  const handleHome = () => {
    const section = document.getElementById("hero-page-utama"); // Mendapatkan elemen dengan ID "hero-page-utama" dan menggulir ke sana dengan efek scroll yang halus
    section?.scrollIntoView({ behavior: "smooth" }); // Menggunakan optional chaining untuk memastikan bahwa section tidak null sebelum memanggil scrollIntoView
  }

  useEffect(() => {
    const handleScroll = () => { // Fungsi untuk menangani scroll dan mengubah rotasi logo
      setRotation(window.scrollY * 0.3); // Mengubah rotasi berdasarkan scroll, dengan faktor 0.3 untuk efek yang lebih halus
    };

    window.addEventListener("scroll", handleScroll); // Menambahkan event listener untuk scroll

    return () => window.removeEventListener("scroll", handleScroll); // Membersihkan event listener saat komponen unmount
  }, []);

  return (
    // Container utama logo
    <div
      className="fixed bottom-6 right-7 w-16 h-16 rounded-full overflow-hidden z-50  shadow-[0_0_15px_5px_rgba(0,0,0,0.5)]"
      style={{
        transform: `rotate(${rotation}deg)`, // Menerapkan rotasi pada logo berdasarkan nilai state rotation
        transition: "transform 0.1s linear", // Menambahkan transisi untuk rotasi agar lebih halus
      }}
    >
      {/* Link ke halaman utama */}
      <Link href="/" onClick={handleHome}> 
        {/* Gambar logo */}
        <Image
          src={O2HLogo} // Sumber gambar logo yang diimpor
          alt="O2H Logo"
          fill // Menggunakan fill untuk membuat gambar mengisi seluruh container
          className="object-cover"
        />
      </Link>
    </div>
  );
}