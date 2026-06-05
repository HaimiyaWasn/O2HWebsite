"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaHome } from "react-icons/fa";
import { Playfair_Display } from "next/font/google";

import O2HLogo from "@/public/img/logos/O2H_Logos_2.png";

/**
 * Font untuk label menu pada Floating Action Button (FAB)
 */
const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

/**
 * Menampilkan logo mengambang yang selalu terlihat di layar
 * dan dapat digunakan sebagai shortcut menuju halaman
 * atau section tertentu
 * 
 * Fitur: 
 * - Logo berputar mengikuti scroll halaman
 * - Tombol kembali ke Home
 * - Efek smooth scroll
 * - Client-side only (menggunakan window)
 * 
 * Cocok digunakan untuk:
 * - Floating Navigation
 * - Quick Action Menu
 * - Floating Brand Logo
 * - Scroll To Top Button
 */
export default function FloatingLogo() {
  /**
   * Menyimpan nilai rotasi logo
   * 
   * Nilai akan bertambah seiring pengguna
   * melakukan scroll halaman
   */
  const [rotation, setRotation] = useState(0);

  /**
   * Menandai bahwa komponen sudah selesai dirender di browser
   * 
   * Digunakan untuk menghindari perbedaan render antara
   * Server Component dan Client Component (hydration mismatch)
   */
  const [mounted, setMounted] = useState(false);

  /**
   * Menjalankan sekali setelah komponen terpasang
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Mengatur rotasi logo berdasarkan posisi scroll
   * 
   * Semakin jauh pengguna scroll, semakin besar sudut rotasi logo
   */
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setRotation(window.scrollY * 0.3);
    };

    window.addEventListener("scroll", handleScroll);

    /**
     * Membersihkan event listener saat komponen
     * dilepas dari DOM
     */
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mounted]);

  /**
   * Scroll halus menuju section hero
   * 
   * Akan dijalankan ketika tombol Home ditekan
   */
  const handleHome = () => {
    document
      .getElementById("hero-page-utama")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  /**
   * Mencegah render sebelum komponen siap dijalankan
   * di browser
   */
  if (!mounted) return null;

  return (
    <div className="fab">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-circle w-14 h-14 bg-transparent border-none shadow-none p-0 overflow-hidden"
      >
        <Image
          src={O2HLogo}
          alt="O2H Logo"
          className="w-full h-full object-cover"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 0.1s linear",
          }}
        />
      </div>

      <div className={`fab-close ${playfairDisplayBold.className}`}>
        Close
        <span className="btn btn-circle w-14 h-14 btn-error bg-red-600 text-white text-lg">
          ✕
        </span>
      </div>

      <div className={playfairDisplayBold.className}>
        Home{" "}
        <Link
          href="/"
          onClick={handleHome}
          className="btn w-14 h-14 btn-circle bg-yellow-400 text-black text-lg"
        >
          <FaHome />
        </Link>
      </div>
    </div>
  );
}