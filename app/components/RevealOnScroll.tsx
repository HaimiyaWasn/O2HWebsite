"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Props untuk komponen RevealOnScroll
 *
 * children:
 * Elemen yang akan diberikan animasi
 *
 * className:
 * Class tambahan untuk styling
 *
 * delay:
 * Jeda sebelum animasi dimulai (detik)
 *
 * duration:
 * Lama animasi berjalan (detik)
 *
 * y:
 * Jarak pergeseran vertikal awal
 *
 * once:
 * true  = animasi hanya berjalan sekali
 * false = animasi akan diputar ulang setiap kali
 *         elemen keluar dan masuk viewport
 */
type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
};

/**
 * Komponen pembungkus (wrapper) yang memberikan
 * animasi fade + slide ketika elemen muncul
 * di area layar (viewport).
 *
 * Cocok digunakan untuk:
 * - Section halaman
 * - Card produk
 * - Card berita
 * - Banner
 * - Tombol CTA
 * - Konten landing page
 *
 * Contoh penggunaan:
 *
 * <RevealOnScroll delay={0.2}>
 *   <Card />
 * </RevealOnScroll>
 */
export default function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  duration = 0.7,
  y = 20,
  once = true,
}: RevealOnScrollProps) {
  return (
    <motion.div
      className={className}
      
      /**
       * Kondisi awal sebelum elemen terlihat
       *
       * opacity: 0 → transparan
       * y: 20      → sedikit di bawah posisi akhir
       */
      initial={{
        opacity: 0,
        y: 20,
      }}

      /**
       * Animasi ketika elemen masuk viewport
       *
       * opacity: 1 → terlihat penuh
       * y: 0       → kembali ke posisi normal
       */
      whileInView={{
        opacity: 1,
        y: 0,
      }}

      /**
       * Konfigurasi viewport
       *
       * once = true:
       * Animasi hanya dimainkan satu kali
       *
       * once = false:
       * Animasi akan dimainkan ulang setiap kali
       * elemen masuk viewport
       */
      viewport={{
        once,
      }}

      /**
       * Pengaturan durasi animasi
       *
       * duration:
       * Lama animasi berjalan
       *
       * delay:
       * Waktu tunggu sebelum animasi dimulai
       */
      transition={{
        duration,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
